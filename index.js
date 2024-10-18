import http from "http";
import {v4} from "uuid";

const port = 3000;
const grades = []

const server = http.createServer((req, res) => {
    // Funções do backend
    const { url, method } = req;
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if (url === '/grades' && method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(grades));
        } else if (url === '/grades' && method === 'POST') {
            const { studentName, subject, grade } = JSON.parse(body);
            const newGrade = {id: v4(), studentName, subject, grade}; 
            grades.push(newGrade);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newGrade));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    })   
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});