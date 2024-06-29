import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

import { useSelector } from 'react-redux'
import { RootState } from '../context/store'
import { Button } from '../components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { app } from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { toast } from 'sonner'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useUpdate } from '../hooks/auth/useUpdate'
import Loader from '../components/ui/loader'

type UserImage = {
  image?: File
  tempUrl?: string
}

const SettingsPage = () => {
  const { currentUser, isPending } = useSelector(
    (state: RootState) => state.user
  )
  const [file, setFile] = useState<UserImage>({})
  const filePickerRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { updateUser } = useUpdate()

  const [formData, setFormData] = useState({
    firstname: currentUser?.firstname || '',
    lastname: currentUser?.lastname || '',
    email: currentUser?.email || '',
    image: currentUser?.image || '',
    password: ''
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile({
        image: file,
        tempUrl: URL.createObjectURL(file)
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    if (file.image) {
      uploadFile()
    }
  }, [file.image])

  const uploadFile = async () => {
    const storage = getStorage(app)
    if (file && file.image) {
      const fileName = `${new Date().getTime()}${file.image.name}`

      const storageRef = ref(storage, fileName)

      const uploadTask = uploadBytesResumable(storageRef, file.image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(Math.round(progress))
        },
        (error) => {
          toast.error("Couldn't upload image: ", {
            description: 'File is over allowed 5 mb'
          })
          console.log(error)
          setUploadProgress(0)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile({ ...file, tempUrl: downloadURL })
            setUploadProgress(0)
            setFormData({ ...formData, image: downloadURL })
          })
        }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await updateUser(formData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='mx-4 sm:ml-20 mt-20 mb-20 space-y-8'>
      {currentUser && (
        <>
          <Card className='max-w-[800px] border-dashed'>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Edit and update your information!
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
                ref={filePickerRef}
                disabled={isPending}
              />
              {currentUser.image && (
                <div
                  className={`relative w-32 h-32 rounded-full ${
                    uploadProgress > 0 ? '' : 'border-4'
                  } shadow-lg cursor-pointer`}
                  onClick={() => filePickerRef.current?.click()}
                >
                  {uploadProgress > 0 && (
                    <CircularProgressbar
                      value={uploadProgress}
                      maxValue={100}
                      strokeWidth={4}
                      text={`${uploadProgress && uploadProgress} %`}
                      className='absolute h-full w-full'
                      styles={{
                        root: {
                          top: 0,
                          left: 0
                        },
                        path: {
                          stroke: `hsl(var(--primary))`
                        },
                        trail: {
                          stroke: `hsl(var(--border))`,
                          opacity: 0
                        },
                        text: {
                          fontSize: '14px',
                          fontWeight: 400,
                          fill: `hsl(var(--foreground))`
                        }
                      }}
                    />
                  )}
                  <img
                    src={file.tempUrl || currentUser.image}
                    alt='Profile image'
                    className={`rounded-full w-full h-full object-cover ${
                      uploadProgress > 0 && 'opacity-50'
                    }`}
                  />
                </div>
              )}
              <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='firstname' className='ml-1'>
                    First Name
                  </Label>
                  <Input
                    id='firstname'
                    name='firstname'
                    onChange={handleInputChange}
                    value={formData.firstname}
                    disabled={isPending}
                  />
                </div>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='lastname' className='ml-1'>
                    Last Name
                  </Label>
                  <Input
                    id='lastname'
                    name='lastname'
                    onChange={handleInputChange}
                    value={formData.lastname}
                    disabled={isPending}
                  />
                </div>
                <div className='flex flex-col justify-center space-y-3'>
                  <Label htmlFor='lastname' className='ml-1'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    onChange={handleInputChange}
                    value={formData.email}
                    disabled={isPending}
                  />
                </div>
                <Button
                  className='flex items-center gap-4'
                  disabled={isPending}
                >
                  {isPending ? <Loader /> : 'Update Information'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className='max-w-[800px] border-dashed'>
            <CardHeader>
              <CardDescription>Edit your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='space-y-4 flex flex-col'>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='current-password' className='ml-1'>
                    Current Password
                  </Label>
                  <Input type='password' id='current-password' />
                </div>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='new-password' className='ml-1'>
                    New Password
                  </Label>
                  <Input type='password' id='new-password' />
                </div>
                <div className='flex flex-col space-y-3'>
                  <Label htmlFor='confirm-password' className='ml-1'>
                    Confirm New Password
                  </Label>
                  <Input type='password' id='confirm-password' />
                </div>
                <Button>Save New Password</Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}

export default SettingsPage
