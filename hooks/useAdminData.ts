import { removeFalsy } from "../lib/helpers"
import {
  AdminAPIResponse,
  ApplicationWithUser,
  UserWithApplications,
} from "../types"
import useSWR from "swr"

export const useApplications = (helpers, initialData) =>
  useSWR<AdminAPIResponse<ApplicationWithUser[]>>(
    `/api/admin/applications?${new URLSearchParams(
      removeFalsy(helpers.getValues())
    )}`,
    {
      fallbackData: {
        count: initialData.length,
        data: initialData,
      },
    }
  )

export const useUsers = (helpers, initialData) =>
  useSWR<AdminAPIResponse<UserWithApplications[]>>(
    `/api/admin/users?${new URLSearchParams(removeFalsy(helpers.getValues()))}`,
    {
      fallbackData: {
        count: initialData.length,
        data: initialData,
      },
    }
  )
