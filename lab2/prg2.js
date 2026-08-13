import {mkdir, rm} from "fs/promises";
//await mkdir("uploads");
await mkdir ("docs/resumes/data", { recursive: true }); 
await mkdir("uploads/images", { recursive: true });
await rm('docs/resumes/data', { recursive: true});
// removes only data folder and not the main folder
await rm("docs", { recursive: true});
// remove main `folder` and sub folder also 