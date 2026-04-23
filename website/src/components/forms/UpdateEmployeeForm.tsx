'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks";
import { CheckCircle, Edit } from "lucide-react";
import ComponentCard from "@/components/common/ComponentCard";
import { axiosInstance, handleAxiosError, getValidImageUrl, onChangeDataEachFieldChange, enumToOptions } from "@/utils";
import { DetailFormInterface, UserDetailFormInterface } from "@/interfaces";
import { AdditionUserData } from "@/interfaces/entityDetail/additionUserData";
import ToggleLabelInput from "@/components/common/ToggleLabelInput";
import { Gender, RoleEnum } from "@/enums";
import { GENDER_LABELS, ROLE_LABELS } from "@/constants"
import { Input } from "@/components/ui/input";

const genderOptions = enumToOptions(Gender, GENDER_LABELS);
const roleOptions = enumToOptions(RoleEnum, ROLE_LABELS);

const UpdateEmployeeForm = ({
  data: initialUserData,
  onUpdateSuccess,
}: DetailFormInterface<UserDetailFormInterface>) => {
  const { id } = initialUserData;
  const { toast } = useToast();
  const [editState, setEditState] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDetailFormInterface>(initialUserData);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const fetchAdditionUserData = async () => {
    try {
      const resData = (await axiosInstance.get<AdditionUserData>(`/users/addition-data?id=${id}`)).data;

      if (resData) {
        setUserData(prev => ({ ...prev, ...resData }));
      }
    } catch (error) {
      toast({
        title: 'Tải thông tin tài khoản thất bại',
        description: handleAxiosError(error),
        variant: 'destructive',
      });
    }
  }

  const handleUpdateProfile = async (): Promise<void> => {
    try {
      const form = new FormData();
      form.append('username', userData.username);
      form.append('email', userData.email);
      form.append('fullname', userData.fullname);
      form.append('address', userData.address);
      form.append('phone_number', userData.phone_number);
      form.append('role_id', userData.role_id.toString());
      form.append('gender', userData.gender.toString());

      if (newImageFile) {
        form.append('avatar', newImageFile);
      };

      const updateResult = await axiosInstance.put(
        '/users/update',
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );

      if (updateResult.data) {
        toast({
          title: `Cập nhật thông tin nhân viên ${userData.fullname} thành công`,
          variant: "success",
        });

        await onUpdateSuccess?.(userData);
      };

    } catch (error) {
      toast({
        title: 'Cập nhật tài khoản thất bại',
        description: handleAxiosError(error),
        variant: 'destructive',
      });
    }
  }

  /*
  - avatar_url: Dùng để cập nhật/hiển thị avatar cũ hoặc mới (nếu có chọn mới)
  - avatar: Là trường được gửi trong form qua Backend
  */

  useEffect(() => {
    fetchAdditionUserData();
  }, []);

  return (
    <>
      <ComponentCard title="Cập nhật thông tin tài khoản" className={'w-full'}>
        <div className="space-y-6">
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-4">
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 shrink-0">
                  <Image
                    width={100}
                    height={100}
                    src={getValidImageUrl(userData?.avatar_url || '')}
                    alt="Ảnh đại diện"
                    unoptimized
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {userData.fullname}
                </h4>
              </div>
              {editState ? (
                <button
                  onClick={async () => {
                    if (editState) await handleUpdateProfile();
                    setEditState(prev => !prev);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 shrink-0"
                >
                  <CheckCircle />
                </button>
              ) : (
                <button
                  onClick={() => setEditState(prev => !prev)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 shrink-0"
                >
                  <Edit />
                </button>
              )}
            </div>
          </div>
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Tên tài khoản
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'username'}
                        fieldValue={userData.username}
                        fieldType={'input'}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'username',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Họ và tên
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'fullname'}
                        fieldValue={userData.fullname}
                        fieldType={'input'}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'fullname',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'email'}
                        fieldValue={userData.email}
                        fieldType={'input'}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'email',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Địa chỉ
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'address'}
                        fieldValue={userData.address}
                        fieldType={'input'}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'address',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Số điện thoại
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'phone_number'}
                        fieldValue={userData.phone_number}
                        fieldType={'input'}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'phone_number',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Giới tính
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'gender'}
                        fieldValue={userData.gender}
                        fieldType={'options'}
                        optionPlaceHolder={'Chọn giới tính'}
                        dataForOptions={genderOptions}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'gender',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: +value
                          }))
                        )}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Loại tài khoản
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <ToggleLabelInput
                        fieldState={editState}
                        fieldName={'role_id'}
                        fieldValue={userData.role_id}
                        fieldType={'options'}
                        optionPlaceHolder={'Chọn loại tài khoản'}
                        dataForOptions={roleOptions}
                        onFieldChange={(value) => onChangeDataEachFieldChange(
                          'role_id',
                          value,
                          (field, value) => setUserData(prev => ({
                            ...prev,
                            [field]: +value
                          }))
                        )}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {
              editState &&
              <>
                <div className="mt-6 grid grid-cols-1">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Chọn hình ảnh mới
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full mb-0"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setNewImageFile(file);
                          setUserData(prev => ({
                            ...prev,
                            avatar_url: URL.createObjectURL(file)
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </ComponentCard>
    </>
  )
}

export default UpdateEmployeeForm