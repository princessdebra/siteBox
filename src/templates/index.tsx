import type { ComponentType } from 'react'
import type { SiteContent, TemplateId } from '../types'
import Salon from './Salon'
import Restaurant from './Restaurant'
import Law from './Law'
import Clinic from './Clinic'
import Gym from './Gym'
import Studio from './Studio'

export const VIEWS: Record<TemplateId, ComponentType<{ content: SiteContent }>> = { salon: Salon, restaurant: Restaurant, law: Law, clinic: Clinic, gym: Gym, studio: Studio }
