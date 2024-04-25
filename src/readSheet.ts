import readXlsxFile from "read-excel-file/node";
import { api } from "./api";
import { WhatsappForm } from "../types/WhatsappForm";

export const readSheet = async () => {
    const schema = {
        'Nome': {
            prop: 'name',
            type: String
        },
        'Telefone': {
            prop: 'phone',
            type: String
        },
    }

    try {
        const result = await readXlsxFile('planilha/planilha.xlsx', {schema, sheet: 4})
        const list = result.rows as { name: string, phone: string }[]
        
        list.forEach(async(person) => {
            const data: WhatsappForm = {
                name: person.name,
                number: person.phone,
                template: 'hello_world'
            }

            await api.post('/api/whatsapp', data)
        })

    } catch (error) {
        console.log(error)
    }
}