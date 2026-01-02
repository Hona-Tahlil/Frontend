import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  User,
  UserCircle,
  Smile,
  Calendar,
  MapPin,
  Hash,
  Phone,
  Mail,
  FileText,
  Pencil,
} from "lucide-react";
import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";
import { Input } from "@/components/Custom/Input/Input";
import { Textarea } from "@/components/Custom/Textarea/Textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Custom/Select/Select";
import DatePicker from "@/components/Custom/DatePicker/DatePicker";
import { LocationSelector } from "@/components/Custom/Province/LocationSelector";
import { Province } from "@/components/Custom/Province/Province";
import { City } from "@/components/Custom/Province/City";
import { Button } from "@/components/Custom/Button/Button";

export default function EditPetOwnerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const readOnlyFieldClasses = isEditing
    ? ""
    : "focus-visible:ring-0 focus-visible:outline-none focus:ring-0 cursor-default";

  const labelClass =
    "flex flex-row-reverse items-center justify-end gap-2 text-right text-small font-bold text-charcoal-700";
  const labelIconWrapClass = "w-6 flex items-center justify-center text-primary";
  const rowClass = "flex flex-col gap-3 md:flex-row md:items-center";
  const rowTopClass = "flex flex-col gap-3 md:flex-row md:items-start";
  const labelWrapClass = "w-full md:w-1/4 flex items-center  pr-2";
  const labelTopWrapClass = "w-full md:w-1/4 flex items-start  pr-2";
  const fieldWrapClass = "w-full md:w-3/4";
  const inputClassName = `h-12 border-1 border-gray-400/20 ${readOnlyFieldClasses}`;
  const textareaClassName = `h-30 drop-shadow-lg border-1 border-gray-400/20 ${readOnlyFieldClasses}`;
  const validationSchema = Yup.object({
    fullName: Yup.string().trim(),
    Province: Yup.string(),
    City: Yup.string(),
    phoneNumber: Yup.string().test(
      "phone-or-empty",
      "شماره تماس معتبر نیست",
      (value) => {
        if (!value) return true;
        return /^09\d{9}$/.test(value);
      },
    ),
    birthDate: Yup.string(),
    email: Yup.string().test(
      "email-or-empty",
      "ایمیل معتبر نیست",
      (value) => {
        if (!value) return true;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
    ),
  });

  return (
    <main dir="rtl" className="min-h-screen bg-second-background py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        <h1 className="text-title text-center mb-2">اطلاعات شخصی</h1>
        <p className="text-small text-center text-charcoal-600 mb-6">
          برای درخواست رزرو باید فیلدهای اجباری را تکمیل کنید.
          <span className="mr-2 text-red-500">*</span>
           نشانه فیلدهای اجباری است.
        </p>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-8">
          <Formik
            initialValues={{
              avatar: "",
              fullName: "",
              gender: "",
              birthDate: "",
              Province: "",
              City: "",
              Address: "",
              Pelak: "",
              Vahed: "",
              postalCode: "",
              phoneNumber: "",
              email: "",
              bio: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("edit profile submit", values);
              setIsEditing(false);
              setSubmitting(false);
            }}
          >
            {({ resetForm }) => (
              <Form className="space-y-6">
                <div className={rowClass}>
                  <div className={labelTopWrapClass}>
                    <div className={labelClass}>
                      <span>پروفایل</span>
                      <span className={labelIconWrapClass}>
                        <UserCircle className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                  <div className={fieldWrapClass}>
                    <div className="flex items-center gap-4">
                      <div className={isEditing ? "" : "pointer-events-none opacity-70"}>
                        <EditableAvatar name="avatar" className="h-16 w-16" />
                      </div>
                      {isEditing && (
                        <div className="flex items-center gap-2 text-small font-bold text-primary">
                          <Pencil className="h-4 w-4" />
                          برای تغییر عکس روی آواتار کلیک کنید
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className="grid gap-5">
                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          نام و نام خانوادگی <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <User className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <Input
                        name="fullName"
                        placeholder="مثلاً: جنیفر باند"
                        shadow
                        readOnly={!isEditing}
                        classes={{ className: "h-12", inputClassName }}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className="grid gap-5">
                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>جنسیت</span>
                        <span className={labelIconWrapClass}>
                          <Smile className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <Select name="gender" disabled={!isEditing}>
                        <SelectTrigger className="h-12 border-1 border-gray-400/20">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="female">زن</SelectItem>
                            <SelectItem value="male">مرد</SelectItem>
                            <SelectItem value="other">سایر</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          تاریخ تولد <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <Calendar className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <DatePicker
                        name="birthDate"
                        shadow
                        placeholder="تاریخ تولد خود را انتخاب کنید"
                        disabled={!isEditing}
                        className="h-12 border-1 border-gray-400/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className="grid gap-5">
                  <div className={rowTopClass}>
                    <div className={labelTopWrapClass}>
                      <div className={labelClass}>
                        <span>نشانی منزل</span>
                        <span className={labelIconWrapClass}>
                          <MapPin className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <div className="flex flex-col gap-4">
                        <p className="text-small font-bold text-charcoal-700">
                          استان و شهر <span className="text-red-500">*</span>
                        </p>
                        <div className={isEditing ? "" : "pointer-events-none opacity-70"}>
                          <LocationSelector>
                            <div className="flex flex-wrap gap-3">
                              <Province className="w-32" />
                              <City className="w-32" />
                            </div>
                          </LocationSelector>
                        </div>

                        <Input
                          name="Address"
                          placeholder="خیابان، کوچه"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />

                        <div className="flex flex-wrap gap-3">
                          <Input
                            name="Pelak"
                            placeholder="پلاک"
                            shadow
                            readOnly={!isEditing}
                            classes={{ className: "h-12", inputClassName }}
                          />
                          <Input
                            name="Vahed"
                            placeholder="واحد"
                            shadow
                            readOnly={!isEditing}
                            classes={{ className: "h-12", inputClassName }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className="grid gap-5">
                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>کد پستی</span>
                        <span className={labelIconWrapClass}>
                          <Hash className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <Input
                        name="postalCode"
                        placeholder="کد پستی"
                        shadow
                        readOnly={!isEditing}
                        classes={{ className: "h-12", inputClassName }}
                      />
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          شماره تماس <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <Phone className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <Input
                        name="phoneNumber"
                        placeholder="مثلاً: 09123456789"
                        shadow
                        readOnly={!isEditing}
                        classes={{ className: "h-12", inputClassName }}
                      />
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>ایمیل</span>
                        <span className={labelIconWrapClass}>
                          <Mail className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <Input
                        name="email"
                        type="email"
                        placeholder="petYar@gmail.com"
                        shadow
                        readOnly={!isEditing}
                        classes={{ className: "h-12", inputClassName }}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className={rowTopClass}>
                  <div className={labelTopWrapClass}>
                    <div className={labelClass}>
                      <span>معرفی مختصر</span>
                      <span className={labelIconWrapClass}>
                        <FileText className="h-6 w-6" />
                      </span>
                    </div>
                  </div>
                  <div className={fieldWrapClass}>
                    <Textarea
                      name="bio"
                      rows={5}
                      placeholder="خودتان بنویسید"
                      classes={{ inputClassName: textareaClassName }}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center justify-end gap-3 pt-2">
                  <div className={isEditing ? "hidden" : "block"}>
                    <Button
                      type="button"
                      shadow
                      onClick={() => setIsEditing(true)}
                    >
                      ویرایش مشخصات
                    </Button>
                  </div>
                  <div className={isEditing ? "flex gap-3" : "hidden"}>
                    <Button type="submit" shadow>
                      تایید
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      shadow={false}
                      onClick={() => {
                        resetForm();
                        setIsEditing(false);
                      }}
                    >
                      انصراف
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
