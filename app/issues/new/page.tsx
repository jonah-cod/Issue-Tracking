"use client"
import {SimpleMdeReact} from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Button, TextField, Callout } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface IssueForm{
  title: string;
  description:string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name='description'
          control={control}
          render={({field})=><SimpleMdeReact placeholder='Description' {...field}/>}
          
          />
        
        <Button>Submit New Issue</Button>
    </form>
  </div>
  )
}

export default NewIssuePage