// src/schemas/ExplorePetSitterSchema.ts
import * as Yup from "yup";

export const explorePetSitterValidationSchema = Yup.object({
  date: Yup.string().required("تاریخ الزامی است"),
});
