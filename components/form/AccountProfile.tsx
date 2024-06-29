'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserValidation } from '@/lib/validator/user';
import { z } from 'zod';
import Image from 'next/image';

import ProfileIcon from '@/assets/profile.svg';
import { ChangeEvent } from 'react';
import { Textarea } from '../ui/textarea';

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

const AccountProfile = () => {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.',
        }),
    });

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: '',
        },
    });

    const handleImage = (
        e: ChangeEvent,
        fieldChange: (value: string) => void,
    ) => {
        e.preventDefault();
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <>
                    <FormField
                        control={form.control}
                        name="profile_photo"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-4">
                                <FormLabel>
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt="profile photo"
                                            width={96}
                                            height={96}
                                            priority
                                            className="rounded-full object-contain"
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
                                        className="mt-0"
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
                                        placeholder="Hoang Nguyen"
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
                                    <Input placeholder="nnhoang" {...field} />
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
                                    <Textarea rows={10} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default AccountProfile;
