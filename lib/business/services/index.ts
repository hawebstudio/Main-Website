import { serviceFamilies as contentServiceFamilies } from '@/content/services'

export const serviceFamilies = contentServiceFamilies.map((family) => family.slug)
