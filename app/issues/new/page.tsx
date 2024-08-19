"use client"
import {SimpleMdeReact} from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Button, TextField, Callout, Text } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/createIssueSchema';
import {z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';


type IssueForm = z.infer< typeof createIssueSchema> 


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("")
  const submitData = async (data: IssueForm)=>{
    try {
      let res =await fetch("/api/issues", {
        body: JSON.stringify(data),
        method: "POST"
      });

      if(!res.ok){
      throw new Error(res.statusText)}

      let results = await res.json();
      if(results.id) router.push("/issues")

    } catch (error) {
      setError("Something unexpected happened!")
    }
    
  }
  return (
    <div className='max-w-xl'>
      {
        error && <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
    <form className='space-y-3' onSubmit={handleSubmit((data)=>submitData(data))}>
        <TextField.Root placeholder='Title' {...register("title")}>
        </TextField.Root>
        {errors.title && <ErrorMessage>{ errors.title.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          render={({field})=><SimpleMdeReact placeholder='Description' {...field}/>}
          
          />
           {errors.description && <ErrorMessage>{ errors.description.message}</ErrorMessage>}
        
        <Button >Submit New Issue</Button>
    </form>
  </div>
  )
}

export default NewIssuePage