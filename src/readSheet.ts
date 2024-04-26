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
                template: "mensagem_bongrano_dia_das_maes_1",
                language: "pt_BR",
                components: [
                    {
                        type: "header",
                        parameters: [
                            {
                                type: "image",
                                image: {
                                    // id: "959771299128082", // bozletrando
                                    id: "967000851500376", // bongrano
                                },
                            },
                        ],
                    },
                ],
            }

            await api.post('/api/whatsapp', data)
        })

    } catch (error) {
        console.log(error)
    }
}