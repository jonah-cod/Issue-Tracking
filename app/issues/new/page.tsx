"use client"
import {SimpleMdeReact} from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Button, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';


interface IssueForm{
  title: string;
  description:string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const submitData = async (data: IssueForm)=>{
    try {
      let res =await fetch("/api/issues", {
        body: JSON.stringify(data),
        method: "POST"
      });
      let results = await res.json();
      if(results.id) router.push("/issues")
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit((data)=>submitData(data))}>
        <TextField.Root placeholder='Title' {...register("title")}>
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({field})=><SimpleMdeReact placeholder='Description' {...field}/>}
        
        />
        
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage