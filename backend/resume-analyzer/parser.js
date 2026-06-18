import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function extractResumeText(file) {

    if (file.mimetype === "application/pdf") {

        const data = await pdf(file.buffer);
        return data.text;

    }

    if (file.mimetype.includes("word")) {

        const result = await mammoth.extractRawText({
            buffer: file.buffer
        });

        return result.value;

    }

    throw new Error("Unsupported file");
}