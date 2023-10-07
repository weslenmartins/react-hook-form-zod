import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Aside } from "./components/Aside"
import { Button } from "./components/Button"
import { FormFooter } from "./components/Form/FormFooter"
import { FormSection } from "./components/Form/FormSection"
import { Input } from "./components/Input"
import { Label } from "./components/Label"
import { Select } from "./components/Select"
import { Textarea } from "./components/Textarea"
import { Checkbox } from './components/Checkbox'
import { FormErrorField } from './components/Form/FormErrorField'

const STATUS_OPTIONS = ["Publicado", "Rascunho"] as const

const createClientFormSchema = z.object({
  name: z.string()
    .min(2, 'O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  company: z.string(),
  cnpjCpf: z.string(),
  businessRelationship: z.array(z.string())
  .refine((businessRelationship) => {
    return businessRelationship.length > 0
  }, "Por favor, selecione uma forma relacionamento"),
  phones: z.array(z.object({
    phone: z.coerce.number({
      invalid_type_error: "Por favor, informe um telefone com apenas números",
    })
      .min(3, 'Por favor, informe um telefone'),
  }))
    .min(1, "Adicione pelo menos um telefone"),
  site: z.string()
    .refine(site => site.startsWith("http://") || site.startsWith("https://"), "Por favor utilizar http:// ou https://"),    
  email: z.string().toLowerCase()
    .min(3, 'Por favor, informe um email')
    .includes('@', {message: 'Por favor, informe um email válido'}),
  street: z.string()
    .min(1, 'Por favor informe um endereço'),
  streetNumber: z.string()
    .min(1, 'Por favor informe um número'),
  streetComplement: z.string(),
  city: z.string(),
  state: z.string()
    .min(1, 'Por favor informe um estado'),
  zipCode: z.string()
    .max(9, 'Por favor informe um CEP válido')
    .refine((code) => {
      const zipCodeRegex = /^[0-9]{5}-?[0-9]{3}$/;
      return zipCodeRegex.test(code);
    }, "Por favor, insira um código postal válido")
    .transform((code) => code.replace('-', '')),
  firstContact: z.string().optional().or(z.coerce.date()),
  comments: z.string(),
  status: z.enum(STATUS_OPTIONS),
  contract: z.instanceof(FileList)
    .transform((file) => file[0]),
})

export type CreateClientFormData = z.infer<typeof createClientFormSchema>

function App() {
  const [output, setOutput] = useState('')

  const { 
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientFormSchema),
    mode: 'all',
    defaultValues: {
      businessRelationship: [],
      phones: [{ phone: undefined }]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'phones',
  })
  
  function createClient( data: CreateClientFormData ) {
    console.log(data.contract)
    setOutput(JSON.stringify(data, null, 2))
  }

  function addNewPhone() {
    append({
      phone: undefined,
    })
  }

  return (
    <main className="h-screen w-screen text-zinc-800 p-3 overflow-x-hidden relative">
      <section className="w-full xl:w-3/5 mx-auto">
        <h1 className="text-3xl font-bold mb-5">Novo cliente</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(createClient)}>
          <FormSection theme="highlight">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input type="text" name="name" register={register} />
              {errors.name && <FormErrorField text={errors.name.message} />}
            </div>
            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input type="text" name="company" register={register} />
              {errors.company && <FormErrorField text={errors.company.message} />}
            </div>
            <div>
              <Label htmlFor="cnpjCpf">CNPJ ou CPF</Label>
              <Input type="text" name="cnpjCpf" register={register} />
              {errors.cnpjCpf && <FormErrorField text={errors.cnpjCpf.message} />}
            </div>
            <div className='col-span-full'>
              <Label htmlFor="businessRelationship">Relacionamento Empresarial</Label>
              <Checkbox 
                name="businessRelationship"
                options={[
                  {
                    value: "personalContact",
                    label: "Contato Pessoal"
                  },
                  {
                    value: "client",
                    label: "Cliente"
                  },
                  {
                    value: "partner",
                    label: "Parceiro"
                  }
                ]}
                register={register}
              />
              {errors.businessRelationship && <FormErrorField text={errors.businessRelationship.message} />}
            </div>
          </FormSection>

          <FormSection title="Dados de contato">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              {fields.map((phone, index) => {
                return (
                  <div key={phone.id}>
                    <Input type="tel" name={`phones.${index}.phone`} register={register} />
                    {errors.phones?.[index]?.phone && <FormErrorField text={errors.phones?.[index]?.phone.message} />}
                  </div>
                ) 
              })}

              {errors.phones && <FormErrorField text={errors.phones.message} />}

              <button type="button" onClick={addNewPhone} className='bg-zinc-600 text-zinc-200 px-2 py-1 text-xs rounded-md mt-1 hover:bg-zinc-800'>Adicionar outro telefone</button>
            </div>
            <div>
              <Label htmlFor="site">Site</Label>
              <Input type="text" name="site" register={register} />
              {errors.site && <FormErrorField text={errors.site.message} />}
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input type="email" name="email" register={register} />
              {errors.email && <FormErrorField text={errors.email.message} />}
            </div>

            <div>
              <Label htmlFor="street">Endereço</Label>
              <Input type="text" name="street" register={register} />
              {errors.street && <FormErrorField text={errors.street.message} />}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="streetNumber">Número</Label>
                <Input type="text" name="streetNumber" register={register} />
                {errors.streetNumber && <FormErrorField text={errors.streetNumber.message} />}
              </div>
              <div className="flex-1">
                <Label htmlFor="streetComplement">Complemento</Label>
                <Input type="text" name="streetComplement" register={register} />
                {errors.streetComplement && <FormErrorField text={errors.streetComplement.message} />}
              </div>
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input type="text" name="city" register={register} />
              {errors.city && <FormErrorField text={errors.city.message} />}
            </div>
            <div>
              <Label htmlFor="state">Estado</Label>
              <Input type="text" name="state" register={register} />
              {errors.state && <FormErrorField text={errors.state.message} />}
            </div>
            <div>
              <Label htmlFor="zipCode">CEP</Label>
              <Input type="text" name="zipCode" register={register} widthSize="xs" />
              {errors.zipCode && <FormErrorField text={errors.zipCode.message} />}
            </div>
          </FormSection>

          <FormSection title="Outras informações" theme="highlight">
            <div>
              <Label htmlFor="firstContact">Data Início de relacionamento</Label>
              <Input type="date" name="firstContact" register={register} />
              {errors.firstContact && <FormErrorField text={errors.firstContact.message} />}
            </div>
            <div>
              <Label htmlFor="contract">Contrato (PDF)</Label>
              <Input type="file" name="contract" register={register} />
              {errors.contract && <FormErrorField text={errors.contract.message} />}
            </div>
            <div className="col-span-full">
              <Label htmlFor="comments">Comentários Adicionais</Label>
              <Textarea name="comments" register={register}  />
              {errors.comments && <FormErrorField text={errors.comments.message} />}
            </div>
          </FormSection>
          
          <FormFooter>
            <Select options={["Publicado", "Rascunho"]} name="status" register={register} />
            {errors.status && <FormErrorField text={errors.status.message} />}
            <Button>Salvar agora</Button>
          </FormFooter>
        </form>
      </section>

      <Aside output={output} setOutput={setOutput} />
    </main>
  )
}

export default App
