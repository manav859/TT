import { apiClient } from './client'
import {
  normBootstrap,
  normHome,
  normWorks,
  normWork,
  normServices,
  normService,
  normAbout,
  normJournal,
  normJournalPost,
  normContact,
} from './normalizers'
import type {
  BootstrapData,
  HomeData,
  WorksData,
  WorkDetail,
  ServicesData,
  ServiceDetail,
  AboutData,
  JournalData,
  JournalDetail,
  ContactData,
  InquiryPayload,
  NewsletterPayload,
  SubmitResult,
} from '@/types/api'

export const getBootstrap = () =>
  apiClient.get<unknown>('bootstrap').then(normBootstrap) as Promise<BootstrapData>

export const getHome = () =>
  apiClient.get<unknown>('home').then(normHome) as Promise<HomeData>

export const getWorks = () =>
  apiClient.get<unknown>('works').then(normWorks) as Promise<WorksData>

export const getWork = (slug: string) =>
  apiClient.get<unknown>(`works/${slug}`).then(normWork) as Promise<WorkDetail>

export const getServices = () =>
  apiClient.get<unknown>('services').then(normServices) as Promise<ServicesData>

export const getService = (slug: string) =>
  apiClient.get<unknown>(`services/${slug}`).then(normService) as Promise<ServiceDetail>

export const getAbout = () =>
  apiClient.get<unknown>('about').then(normAbout) as Promise<AboutData>

export const getJournal = (page = 1) =>
  apiClient.get<unknown>(`journal?page=${page}&per_page=12`).then(normJournal) as Promise<JournalData>

export const getJournalPost = (slug: string) =>
  apiClient.get<unknown>(`journal/${slug}`).then(normJournalPost) as Promise<JournalDetail>

export const getContact = () =>
  apiClient.get<unknown>('contact').then(normContact) as Promise<ContactData>

export const postInquiry = (payload: InquiryPayload) =>
  apiClient.post<SubmitResult>('inquiries', payload)

export const postNewsletter = (payload: NewsletterPayload) =>
  apiClient.post<SubmitResult>('newsletter', payload)
