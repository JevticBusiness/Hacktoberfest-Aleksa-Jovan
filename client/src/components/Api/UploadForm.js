import React, { Fragment, useState } from 'react'
import axios from 'axios'

const UploadForm = () => {
    
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})
    const [title, setTitle] = useState('')

    const onFileChange = e => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onTitleChange = e => {
        setTitle(e.target.value)
    }

    const onFormSubmit = async e => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('memeImage', file, title)

        try {
            const res = await axios.post('http://localhost:5000/api/posts', fd, {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const { fileName, filePath } = res.data

            setUploadedFile({ fileName, filePath })
        } catch(err) {
           console.log(err)
        }
    }

    return (
        <Fragment>
            <form onSubmit={onFormSubmit}>
                <div className="imageInputGroup">
                    <input onChange={onFileChange} style={{display: 'none'}} id="imageFile" type="file" />
                    <label htmlFor="imageFile">
                        { filename }
                    </label>
                </div>

                <div className="txtInputGroupt">
                    <input onChange={onTitleChange} value={title} type="text" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </Fragment>
    )
}

export default UploadForm
