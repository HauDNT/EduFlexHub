import React, { useState } from "react"
import Image from 'next/image'
import { FaCamera } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UploadImageButtonInterface } from "@/interfaces"

export default function UploadImageButton({
    form,
    name,
    label,
    callback = async () => {},
}: UploadImageButtonInterface) {
    const [imageUrlSelected, setImageUrlSelected] = useState<File | null>(null);

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
                <FormItem className="flex flex-col items-center">
                    { label ?? <FormLabel>{label}</FormLabel>}

                    <FormControl className={'cursor-pointer'}>
                            {
                                !imageUrlSelected ? (
                                    <>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            id="upload-photo"
                                            className="hidden"
                                            {...field}
                                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                                const file = e.target.files?.[0];

                                                if (file) {
                                                    onChange(file);
                                                    setImageUrlSelected(file);
                                                    await callback(file);
                                                }
                                            }}
                                        />

                                        <label
                                            htmlFor="upload-photo"
                                            className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full shadow-md cursor-pointer hover:bg-orange-600"
                                        >
                                            <FaCamera size={25} />
                                        </label>
                                    
                                        <span className="mt-2 text-sm font-medium text-gray-700">Add Photo</span>
                                    </>
                                ) : (
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-sm">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={URL.createObjectURL(imageUrlSelected)}
                                            alt="User avatar"
                                            unoptimized
                                        />
                                    </div>
                                )
                            }
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
