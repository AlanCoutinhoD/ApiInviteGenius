import TemplateModel from "../models/template";
import { Template } from "../interfaces/template.interface";



const getAllTemplates = async() => {
    const responseUser = await TemplateModel.find({})
    return responseUser;
    
}

const getAllTemplatesByName = async(name: string) => {
    const responseUser = await TemplateModel.find({name:name})
    return responseUser;
    
}

const insertTemplate = async( item: Template)  => {
    const responseInsert = await TemplateModel.create(item);
    return responseInsert;
};

export {getAllTemplates, insertTemplate, getAllTemplatesByName}