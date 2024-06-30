'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';

import ProfileIcon from '@/assets/profile.svg';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import Image from 'next/image';

import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';

import { isBase64Image } from '@/lib/utils';
import { updateUser } from '@/lib/actions/user.actions';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image ? user.image : '',
            name: user?.name ? user.name : '',
            username: user?.username ? user.username : '',
            bio: user?.bio ? user.bio : '',
        },
    });

    /**
     * Handle image input change event.
     *
     * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
     * @param {(value: string) => void} fieldChange - The function to change the field value.
     */
    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void,
    ) => {
        // Prevent the default form submission behavior.
        e.preventDefault();

        const fileReader = new FileReader();

        // Check if any files are selected.
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            // Check if the selected file is an image.
            if (!file.type.includes('image')) return;

            // Read the selected file as a data URL.
            fileReader.onload = async (event) => {
                // Get the data URL of the selected image and pass it to the field change function.
                const imageDataUrl = event.target?.result?.toString() || '';

                fieldChange(imageDataUrl);
            };

            // Read the selected file as a data URL.
            fileReader.readAsDataURL(file);
        }
    };

    /**
     * Handle form submission event.
     *
     * @param {z.infer<typeof UserValidation>} values - The form values.
     */
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        // Get the profile photo from the form values.
        const blob = values.profile_photo;

        // Check if the profile photo has been changed.
        const hasImageChanged = isBase64Image(blob);

        if (hasImageChanged) {
            // Upload the changed profile photo.
            const imgRes = await startUpload(files);

            // If the upload was successful, update the profile photo URL.
            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }

        // Update the user profile with the new values.
        await updateUser({
            userId: user.id,
            username: values.username,
            name: values.name,
            bio: values.bio,
            image: values.profile_photo,
            path: pathname,
        });

        // If the user is editing their profile, go back to the previous page.
        if (pathname === '/profile/edit') {
            router.back();
        } else {
            // Otherwise, go to the home page.
            router.push('/');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 text-white"
            >
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt="profile photo"
                                        width={96}
                                        height={96}
                                        priority
                                        className="aspect-square rounded-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={ProfileIcon}
                                        alt="profile photo"
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload a photo"
                                    className="account-form_file-input"
                                    onChange={(e) =>
                                        handleImage(e, field.onChange)
                                    }
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    // placeholder="Hoang Nguyen"
                                    className="account-form_input-text"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    // placeholder="nnhoang"
                                    className="account-form_input-text"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className="account-form_input-text"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-white font-bold text-black">
                    {btnTitle}
                </Button>
            </form>
        </Form>
    );
};

export default AccountProfile;

// -------------------------------------------------
// 'use client';

// import * as z from 'zod';
// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import { usePathname, useRouter } from 'next/navigation';
// import { ChangeEvent, useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';

// import { useUploadThing } from '@/lib/uploadthing';
// import { isBase64Image } from '@/lib/utils';

// import { UserValidation } from '@/lib/validations/user';
// import { updateUser } from '@/lib/actions/user.actions';

// interface Props {
//     user: {
//         id: string;
//         objectId: string;
//         username: string;
//         name: string;
//         bio: string;
//         image: string;
//     };
//     btnTitle: string;
// }

// const AccountProfile = ({ user, btnTitle }: Props) => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { startUpload } = useUploadThing('imageUploader');

//     const [files, setFiles] = useState<File[]>([]);

//     const form = useForm<z.infer<typeof UserValidation>>({
//         resolver: zodResolver(UserValidation),
//         defaultValues: {
//             profile_photo: user?.image ? user.image : '',
//             name: user?.name ? user.name : '',
//             username: user?.username ? user.username : '',
//             bio: user?.bio ? user.bio : '',
//         },
//     });

//     const onSubmit = async (values: z.infer<typeof UserValidation>) => {
//         const blob = values.profile_photo;

//         const hasImageChanged = isBase64Image(blob);
//         if (hasImageChanged) {
//             const imgRes = await startUpload(files);

//             if (imgRes && imgRes[0].url) {
//                 values.profile_photo = imgRes[0].url;
//             }
//         }

//         await updateUser({
//             name: values.name,
//             path: pathname,
//             username: values.username,
//             userId: user.id,
//             bio: values.bio,
//             image: values.profile_photo,
//         });

//         if (pathname === '/profile/edit') {
//             router.back();
//         } else {
//             router.push('/');
//         }
//     };

//     const handleImage = (
//         e: ChangeEvent<HTMLInputElement>,
//         fieldChange: (value: string) => void,
//     ) => {
//         e.preventDefault();

//         const fileReader = new FileReader();

//         if (e.target.files && e.target.files.length > 0) {
//             const file = e.target.files[0];
//             setFiles(Array.from(e.target.files));

//             if (!file.type.includes('image')) return;

//             fileReader.onload = async (event) => {
//                 const imageDataUrl = event.target?.result?.toString() || '';
//                 fieldChange(imageDataUrl);
//             };

//             fileReader.readAsDataURL(file);
//         }
//     };

//     return (
//         <Form {...form}>
//             <form
//                 className="flex flex-col justify-start gap-10"
//                 onSubmit={form.handleSubmit(onSubmit)}
//             >
//                 <FormField
//                     control={form.control}
//                     name="profile_photo"
//                     render={({ field }) => (
//                         <FormItem className="flex items-center gap-4">
//                             <FormLabel className="account-form_image-label">
//                                 {field.value ? (
//                                     <Image
//                                         src={field.value}
//                                         alt="profile_icon"
//                                         width={96}
//                                         height={96}
//                                         priority
//                                         className="rounded-full object-contain"
//                                     />
//                                 ) : (
//                                     <Image
//                                         src="/assets/profile.svg"
//                                         alt="profile_icon"
//                                         width={24}
//                                         height={24}
//                                         className="object-contain"
//                                     />
//                                 )}
//                             </FormLabel>
//                             <FormControl className="text-base-semibold flex-1 text-gray-200">
//                                 <Input
//                                     type="file"
//                                     accept="image/*"
//                                     placeholder="Add profile photo"
//                                     className="account-form_image-input"
//                                     onChange={(e) =>
//                                         handleImage(e, field.onChange)
//                                     }
//                                 />
//                             </FormControl>
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                         <FormItem className="flex w-full flex-col gap-3">
//                             <FormLabel className="text-base-semibold text-light-2">
//                                 Name
//                             </FormLabel>
//                             <FormControl>
//                                 <Input
//                                     type="text"
//                                     className="account-form_input no-focus"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                         <FormItem className="flex w-full flex-col gap-3">
//                             <FormLabel className="text-base-semibold text-light-2">
//                                 Username
//                             </FormLabel>
//                             <FormControl>
//                                 <Input
//                                     type="text"
//                                     className="account-form_input no-focus"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <FormField
//                     control={form.control}
//                     name="bio"
//                     render={({ field }) => (
//                         <FormItem className="flex w-full flex-col gap-3">
//                             <FormLabel className="text-base-semibold text-light-2">
//                                 Bio
//                             </FormLabel>
//                             <FormControl>
//                                 <Textarea
//                                     rows={10}
//                                     className="account-form_input no-focus"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 <Button type="submit" className="bg-primary-500">
//                     {btnTitle}
//                 </Button>
//             </form>
//         </Form>
//     );
// };

// export default AccountProfile;
