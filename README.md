# Local network domain name broadcasting

Proof-of-concept Electron app which starts a server and broadcasts its existence over the local network, allowing other devices to connect to it.

`npm start` to launch the app, or `npm run debug` to start it with the inspector open.

## Dependencies

Uses [multicast-dns](https://github.com/mafintosh/multicast-dns) to broadcast the host on the local network.

Starts a [koa server](http://koajs.com/) on port 2017 listening to the broadcast host.

[Electron](https://github.com/electron/electron) runs the app, whose interface is drawn using [framework](https://github.com/magnusdahlstrand/framework).