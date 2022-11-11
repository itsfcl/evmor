import * as net from "net";

interface Connection {
    port: number;
    ip: string;
    bootstrapped: boolean;
    light: boolean;
}

class NetCore {

    public knownAddresses: Connection[] = [];

    public sockets: net.Socket[] = [];

    public launch(port: number, processCallback: (msg: string) => void) {
        let server = net.createServer((socket) => {
            socket.write('N1 launched');
            socket.pipe(socket);
        });
        
        server.listen(port);
        server.on("connection", async socket => {
            this.knownAddresses.push({port: socket.remotePort || 0, ip: socket.remoteAddress || "" , bootstrapped: false, light: false});
            console.log(`${socket.remoteAddress}:${socket.remotePort} connected to you`)
            socket.on("data", async (data) => {
                processCallback(data.toString('utf8'));
            })
        })
        const client = new net.Socket();
        this.knownAddresses.forEach(async con => {
            this.sockets.push(client.connect(con.port, con.ip, () => console.log(`Connected to ${con.ip}:${con.port}`)))
        })
    }

    public connect(port: number, ip: string, ownport: number) {
        const client = new net.Socket();
        const s = client.connect(port, ip, () => console.log(`Connected to ${ip}:${port}`));
        this.sockets.push(s);
        s.write(ownport.toString());
    }

    public message(msg: string) {
        this.sockets.forEach(async socket => {
            socket.write(msg);
        });
    } 

}
