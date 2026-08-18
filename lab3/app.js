import http from "http";
const server = http.createServer();
server.on('request', (req, res) => {
    res.write("<h1> welcome to server side programming, yay </h1>");
    res.write("<h2> nodemon is running </h2>");
    res.write("<h3> this is a simple server </h3>");
    res.end();
});

server.listen(5000,()=>{
    console.log("server is running on port 5000");
});