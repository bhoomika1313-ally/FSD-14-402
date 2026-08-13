import {writeFile, readFile} from 'fs/promises';

// await writeFile('stud.txt', 'ravikant singh\nrollno:82');
// console.log("file written");
// const data =  await readFile("stud.txt", "utf-8");
// console.log(`file contents: ${data}`); 

const addContent = async (fname,content) =>{
    await writeFile(fname, content);
    console.log(`${content} written in file: ${fname}`);

};

const readContent = async (fname) => {
    const data = await readFile(fname, "utf-8");
    return data;
};

const appendContent = async (fname, content) => {
    await writeFile(fname , "\n" + content);
    console.log("data appended");
};

await addContent('notes.txt', 'FS is easy in js');
console.log("contents/n", await readContent('notes.txt'));
await appendContent('notes.txt', '\n it can read, write and append files');
console.log(" updated contents/n", await readContent('notes.txt'));