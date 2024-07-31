"use client"
import {SimpleMdeReact} from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { Button, TextField } from '@radix-ui/themes'
const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <SimpleMdeReact placeholder='Description'/>
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage