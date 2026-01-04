import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import PreviewableAvatar from "@/components/Custom/Avatar/PreviewableAvatar";
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
import {
  fetchCitiesService,
  fetchProvincesService,
} from "@/services/provinceService";
import { getProfileService, updateProfileService } from "@/services/profileService";
import type { CityResponse, ProvinceResponse } from "@/types/addressInfoTypes";
import type { ProfileFormValues, ProvinceCitySummaryProps } from "@/types/profileEditTypes";
import type { ProfileData } from "@/types/profileTypes";
import { PROVINCES_QUERY_KEY, citiesQueryKey } from "@/keys/locationKeys";

function ProvinceCitySummary({
  provinceId,
  cityId,
  className,
}: ProvinceCitySummaryProps) {
  const provinceNumber = Number.parseInt(provinceId ?? "", 10);
  const cityNumber = Number.parseInt(cityId ?? "", 10);
  const hasProvinceSelection = Boolean(provinceId);
  const hasCitySelection = Boolean(cityId);
  const canFetchCities = Number.isFinite(provinceNumber);

  const { data: provincesData } = useQuery<ProvinceResponse>(
    PROVINCES_QUERY_KEY,
    fetchProvincesService,
    {
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const { data: citiesData } = useQuery<CityResponse>(
    citiesQueryKey(provinceNumber),
    () => fetchCitiesService(provinceNumber),
    {
      enabled: canFetchCities,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const provinceName = provincesData?.data.find(
    (province) => province.num === provinceNumber,
  )?.name;
  const cityName = citiesData?.data.find((city) => city.num === cityNumber)?.name;

  if (!hasProvinceSelection && !hasCitySelection) {
    return <div className={className}>استان و شهر وارد نشده</div>;
  }

  const provinceText = hasProvinceSelection
    ? provinceName ?? "نام استان نامشخص"
    : "وارد نشده";
  const cityText = hasCitySelection ? cityName ?? "نام شهر نامشخص" : "وارد نشده";

  return (
    <div className={className}>
      <div>استان {provinceText}</div>
      <div>شهر {cityText}</div>
    </div>
  );
}

const defaultValues: ProfileFormValues = {
  userprof: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  province: "",
  city: "",
  streetAddress: "",
  houseNumber: "",
  unit: "",
  postalCode: "",
  phone: "",
  email: "",
  bio: "",
};

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
  const labelWrapClass = "w-full md:w-1/4 flex items-center pr-2";
  const labelTopWrapClass = "w-full md:w-1/4 flex items-start pr-2";
  const fieldWrapClass = "w-full md:w-3/4";
  const inputClassName = `h-12 border-1 border-gray-400/20 ${readOnlyFieldClasses}`;
  const textareaClassName = `h-30 drop-shadow-lg border-1 border-gray-400/20 ${readOnlyFieldClasses}`;
  const valueTextClass = "text-small font-bold text-charcoal-700";
  const [initialValues, setInitialValues] = useState<ProfileFormValues>(defaultValues);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [mappedProvinceId, setMappedProvinceId] = useState("");
  const [mappedCityId, setMappedCityId] = useState("");

  const provinceNumber = Number.parseInt(mappedProvinceId, 10);
  const canFetchCities = Number.isFinite(provinceNumber);
  const { data: provincesData } = useQuery<ProvinceResponse>(
    PROVINCES_QUERY_KEY,
    fetchProvincesService,
    {
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );
  const { data: citiesData } = useQuery<CityResponse>(
    citiesQueryKey(provinceNumber),
    () => fetchCitiesService(provinceNumber),
    {
      enabled: canFetchCities,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
    },
  );

  const mapGenderValue = (value?: string | null) => {
    if (!value) return "";
    if (value === "\u0622\u0642\u0627" || value === "\u0645\u0631\u062f") {
      return "1";
    }
    if (value === "\u062e\u0627\u0646\u0645" || value === "\u0632\u0646") {
      return "2";
    }
    return "";
  };

  useEffect(() => {
    let isMounted = true;

    getProfileService()
      .then((response) => {
        if (!isMounted) return;
        const data = response.data;
        setProfileData(data);
        setInitialValues({
          ...defaultValues,
          userprof: data.pictureLink ?? "",
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          gender: mapGenderValue(data.gender),
          birthDate: data.birthDate ?? "",
          streetAddress: data.address?.streetAddress ?? "",
          houseNumber:
            data.address?.houseNumber !== null &&
            data.address?.houseNumber !== undefined
              ? String(data.address.houseNumber)
              : "",
          unit:
            data.address?.unit !== null && data.address?.unit !== undefined
              ? String(data.address.unit)
              : "",
          postalCode: data.address?.postalCode ?? "",
          phone: data.phone ?? "",
          email: data.email ?? "",
        });
      })
      .catch((error) => {
        console.error("profile fetch failed", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!profileData?.address?.provinceName || !provincesData?.data) return;
    const matchedProvince = provincesData.data.find(
      (province) => province.name === profileData.address?.provinceName,
    );
    if (matchedProvince) {
      setMappedProvinceId(matchedProvince.num.toString());
    }
  }, [profileData?.address?.provinceName, provincesData]);

  useEffect(() => {
    if (!mappedProvinceId) return;
    setInitialValues((prev) => ({ ...prev, province: mappedProvinceId }));
  }, [mappedProvinceId]);

  useEffect(() => {
    if (!profileData?.address?.cityName || !citiesData?.data) return;
    const matchedCity = citiesData.data.find(
      (city) => city.name === profileData.address?.cityName,
    );
    if (matchedCity) {
      setMappedCityId(matchedCity.num.toString());
    }
  }, [profileData?.address?.cityName, citiesData]);

  useEffect(() => {
    if (!mappedCityId) return;
    setInitialValues((prev) => ({ ...prev, city: mappedCityId }));
  }, [mappedCityId]);

  const formatDate = (value: string) => {
    if (!value) return "تاریخ تولد وارد نشده";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.valueOf())) return value;
    return parsed.toLocaleDateString("fa-IR");
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().trim(),
    lastName: Yup.string().trim(),
    province: Yup.string(),
    city: Yup.string(),
    phone: Yup.string().test(
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
          ستاره نشانه فیلدهای اجباری است.
        </p>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg md:p-8">
          <Formik<ProfileFormValues>
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              const addressFields = [
                values.province,
                values.city,
                values.streetAddress,
                values.houseNumber,
                values.unit,
              ];
              const hasAnyAddressField = addressFields.some((value) =>
                String(value ?? "").trim(),
              );
              const isAddressComplete = addressFields.every((value) =>
                String(value ?? "").trim(),
              );

              if (hasAnyAddressField && !isAddressComplete) {
                setStatus({
                  addressError:
                    "برای ثبت آدرس، استان، شهر، آدرس دقیق، پلاک و واحد را کامل وارد کنید.",
                });
                setSubmitting(false);
                return;
              }

              setSubmitting(true);
              try {
                const formData = new FormData();

                if (values.firstName?.trim()) {
                  formData.append("firstName", values.firstName.trim());
                }
                if (values.lastName?.trim()) {
                  formData.append("lastName", values.lastName.trim());
                }
                if (values.gender) {
                  formData.append("gender", values.gender);
                }
                if (values.birthDate) {
                  formData.append("birthDate", values.birthDate);
                }
                if (values.phone) {
                  formData.append("phone", values.phone);
                }
                if (values.postalCode) {
                  formData.append("postalCode", values.postalCode);
                }
                if (hasAnyAddressField && isAddressComplete) {
                  formData.append("province", values.province);
                  formData.append("city", values.city);
                  formData.append("streetAddress", values.streetAddress);
                  formData.append("houseNumber", values.houseNumber);
                  formData.append("unit", values.unit);
                }
                if (values.userprof && values.userprof instanceof File) {
                  formData.append("userprof", values.userprof);
                }

                await updateProfileService(formData);
                setStatus(undefined);
                setIsEditing(false);
              } catch (error) {
                console.error("profile update failed", error);
                setStatus({
                  submitError: "ثبت اطلاعات انجام نشد. دوباره تلاش کنید.",
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ resetForm, values, status }) => (
              <Form className="space-y-6">
                <div className={rowClass}>
                  <div className={labelTopWrapClass}>
                    <div className={labelClass}>
                      <span>پروفایل</span>
                      <span className={labelIconWrapClass}>
                        <UserCircle className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className={fieldWrapClass}>
                    <div className="flex items-center gap-4">
                      <div className={isEditing ? "" : "opacity-70"}>
                        <PreviewableAvatar
                          name="userprof"
                          className="h-16 w-16"
                          canEdit={isEditing}
                        />
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
                          نام <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <User className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Input
                          name="firstName"
                          placeholder="مثلاً: جنیفر"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {values.firstName ? values.firstName : "نام وارد نشده"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          نام خانوادگی <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <User className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Input
                          name="lastName"
                          placeholder="مثلاً: باند"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {values.lastName ? values.lastName : "نام خانوادگی وارد نشده"}
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
                          جنسیت <span className="text-red-500">*</span>
                        </span>
                        <span className={labelIconWrapClass}>
                          <Smile className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Select name="gender" disabled={!isEditing}>
                          <SelectTrigger className="h-12 border-1 border-gray-400/20">
                            <SelectValue placeholder="انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">مرد</SelectItem>
                              <SelectItem value="2">زن</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className={valueTextClass}>
                          {values.gender === "1"
                            ? "مرد"
                            : values.gender === "2"
                            ? "زن"
                            : "جنسیت وارد نشده"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          تاریخ تولد
                        </span>
                        <span className={labelIconWrapClass}>
                          <Calendar className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <DatePicker
                          name="birthDate"
                          shadow
                          placeholder="تاریخ تولد خود را انتخاب کنید"
                          disabled={!isEditing}
                          className="h-12 border-1 border-gray-400/20"
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {formatDate(values.birthDate)}
                        </div>
                      )}
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
                          <MapPin className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      <div className="flex flex-col gap-4">
                        {status?.addressError && (
                          <div className="text-small font-bold text-red-500">
                            {status.addressError}
                          </div>
                        )}
                        {isEditing ? (
                          <div className={isEditing ? "" : "pointer-events-none opacity-70"}>
                            <LocationSelector initialProvince={initialValues.province}>
                              <div className="flex flex-wrap gap-3">
                                <Province className="w-32" name="province" />
                                <City className="w-32" name="city" />
                              </div>
                            </LocationSelector>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-3">
                            <ProvinceCitySummary
                              provinceId={values.province}
                              cityId={values.city}
                              className={valueTextClass}
                            />
                          </div>
                        )}

                        {isEditing ? (
                          <Input
                            name="streetAddress"
                            placeholder="خیابان، کوچه"
                            shadow
                            readOnly={!isEditing}
                            classes={{ className: "h-12", inputClassName }}
                          />
                        ) : (
                          <div className={valueTextClass}>
                            {values.streetAddress
                              ? values.streetAddress
                              : "آدرس وارد نشده"}
                          </div>
                        )}

                        <div
                          className={isEditing ? "flex flex-wrap gap-3" : "flex flex-col gap-2"}
                        >
                          {isEditing ? (
                            <>
                              <Input
                                name="houseNumber"
                                placeholder="پلاک"
                                shadow
                                readOnly={!isEditing}
                                classes={{ className: "h-12", inputClassName }}
                              />
                              <Input
                                name="unit"
                                placeholder="واحد"
                                shadow
                                readOnly={!isEditing}
                                classes={{ className: "h-12", inputClassName }}
                              />
                            </>
                          ) : (
                            <>
                              <div className={valueTextClass}>
                                {values.houseNumber
                                  ? `پلاک ${values.houseNumber}`
                                  : "پلاک وارد نشده"}
                              </div>
                              <div className={valueTextClass}>
                                {values.unit ? `واحد ${values.unit}` : "واحد وارد نشده"}
                              </div>
                            </>
                          )}
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
                          <Hash className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Input
                          name="postalCode"
                          placeholder="کد پستی"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {values.postalCode
                            ? values.postalCode
                            : "کد پستی وارد نشده"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>
                          شماره تماس
                        </span>
                        <span className={labelIconWrapClass}>
                          <Phone className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Input
                          name="phone"
                          placeholder="مثلاً: 09123456789"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {values.phone ? values.phone : "شماره تماس وارد نشده"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={rowClass}>
                    <div className={labelWrapClass}>
                      <div className={labelClass}>
                        <span>ایمیل</span>
                        <span className={labelIconWrapClass}>
                          <Mail className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className={fieldWrapClass}>
                      {isEditing ? (
                        <Input
                          name="email"
                          type="email"
                          placeholder="petYar@gmail.com"
                          shadow
                          readOnly={!isEditing}
                          classes={{ className: "h-12", inputClassName }}
                        />
                      ) : (
                        <div className={valueTextClass}>
                          {values.email ? values.email : "ایمیل وارد نشده"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-black/10" />

                <div className={rowTopClass}>
                  <div className={labelTopWrapClass}>
                    <div className={labelClass}>
                      <span>معرفی مختصر</span>
                      <span className={labelIconWrapClass}>
                        <FileText className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className={fieldWrapClass}>
                    {isEditing ? (
                      <Textarea
                        name="bio"
                        rows={5}
                        placeholder="خودتان بنویسید"
                        classes={{ inputClassName: textareaClassName }}
                        readOnly={!isEditing}
                      />
                    ) : (
                      <div className={valueTextClass}>
                        {values.bio ? values.bio : "معرفی مختصر وارد نشده"}
                      </div>
                    )}
                  </div>
                </div>

                {status?.submitError && (
                  <div className="text-small font-bold text-red-500">
                    {status.submitError}
                  </div>
                )}

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




