"use client";
import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useToast } from "../../hooks/useToast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  user_email: yup.string().email("Invalid email format").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for form submission
  const { success, error } = useToast();

  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sendEmail = async (data) => {
    const serviceID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAIL_USER_ID;

    setIsSubmitting(true); // Set loading state to true before sending

    try {
      const result = await emailjs.sendForm(serviceID, templateID, form.current, userID);
      console.log("Email sent:", result.text);
      setEmailSubmitted(true);
      success("Email sent successfully!");
    } catch (err) {
      console.error("Error sending email:", err.text);
      error("Something went wrong, please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state after completion
    }
  };

  return (
    <section
      id="connect"
      className="relative grid gap-4 py-24 my-12 md:grid-cols-2 md:my-12"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div>
        <h5 className="my-2 text-xl font-bold text-white">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you!
        </p>
        <div className="flex flex-row gap-2 socials">
          <Link href="https://github.com" target="_blank">
            <FaGithub className="w-6 h-6 text-gray-200 hover:text-purple-500" />
          </Link>
          <Link href="https://linkedin.com" target="_blank">
            <FaLinkedin className="w-6 h-6 text-gray-200 hover:text-purple-500" />
          </Link>
        </div>
      </div>
      <div>
        <form
          ref={form}
          className="flex flex-col"
          onSubmit={handleSubmit(sendEmail)}
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              name="user_email"
              type="email"
              id="email"
              {...register("user_email")}
              className={`bg-[#160e47d5] border ${
                errors.user_email ? "border-red-500" : "border-[#33353F]"
              } placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5`}
              placeholder="jacob@google.com"
            />
            {errors.user_email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.user_email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-white"
            >
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              {...register("subject")}
              className={`bg-[#160e47d5] border ${
                errors.subject ? "border-red-500" : "border-[#33353F]"
              } placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5`}
              placeholder="Want to discuss a new project about..."
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              {...register("message")}
              className={`bg-[#160e47d5] border ${
                errors.message ? "border-red-500" : "border-[#33353F]"
              } placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5`}
              placeholder="Let's have an online meeting on..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-lg w-full ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                Sending{" "}
                <span
                  className="w-4 h-4 ml-2 border-2 border-white rounded-full animate-spin border-t-transparent"
                ></span>
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
