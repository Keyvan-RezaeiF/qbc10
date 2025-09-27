import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod";
import './App.css'
import styles from "./styles.module.css"

const formDataSchema = z.object({
  name: z.string().min(3, { error: "Name must be at least 3 characters long" }).max(20, { error: "Name must be at most 20 characters long" }),
  email: z.email({ error: "Invalid email address" }),
  subject: z.enum(['general', 'support', 'sales', 'partnership', 'feedback'], { error: "Please select a valid subject" }),
  priority: z.enum(['low', 'medium', 'high'], { error: "Please select a priority level" }),
  message: z.string().max(500, { error: "Message must be at most 500 characters long" }).optional(),
});

type FromData = z.infer<typeof formDataSchema>

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FromData>({
    resolver: zodResolver(formDataSchema),
  })

  const onSubmit = (data: FromData) => {
    console.log('Form submitted successfully:', data)
    reset()
  }

  return (
    <div className={styles.page}>
      <section className={styles.contactContent}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactFormSection}>
              <h2>Send us a Message</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.contactForm}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    {...register('name')}
                  />
                  {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email address"
                    {...register('email')}
                  />
                  {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    {...register('subject')}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  {errors.subject && <p className={styles.errorText}>{errors.subject.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label>Priority Level *</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="low"
                        {...register('priority')}
                      />
                      Low
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="medium"
                        {...register('priority')}
                      />
                      Medium
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="high"
                        {...register('priority')}
                      />
                      High
                    </label>
                  </div>
                  {errors.priority && <p className={styles.errorText}>{errors.priority.message}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    {...register('message')}
                  ></textarea>
                  {errors.message && <p className={styles.errorText}>{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
