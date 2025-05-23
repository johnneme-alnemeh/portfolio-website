"use client";
import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import { motion } from "framer-motion";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(serviceID, templateID, form.current, userID);
      console.log("Email sent:", result.text);
      setEmailSubmitted(true);
      success("Email sent successfully!");
    } catch (err) {
      console.error("Error sending email:", err.text);
      error("Something went wrong, please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="connect"
      className="relative py-12 sm:py-16 md:py-24 my-8 sm:my-12 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient-x">
              Let&apos;s Connect
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg text-pretty px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </motion.p>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Left column - Contact info */}
          <motion.div 
            className="lg:col-span-5 space-y-6 sm:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Contact card */}
            <div className="bg-gradient-to-br from-[#0c142e]/80 to-[#1a1a2e]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl h-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h3>
              
              {/* Contact methods */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <HiOutlineMail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Email</p>
                    <p className="text-sm sm:text-base text-white font-medium break-all">john.alnemeh@gmail.com</p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-medium text-gray-400 mb-3 sm:mb-4">Connect with me</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <motion.a 
                    href="https://github.com/johnneme-alnemeh" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.1 }}
                    aria-label="GitHub Profile"
                  >
                    <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.a>
                  <motion.a 
                    href="https://linkedin.com/in/john-al-nemeh-41b4642ab" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.1 }}
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Contact form */}
          <motion.div 
            className="lg:col-span-7 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-[#0c142e]/80 to-[#1a1a2e]/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white flex items-center">
                <BsChatLeftText className="mr-2 text-blue-400" /> Send Me a Message
              </h3>
              
              <form
                ref={form}
                className="space-y-4 sm:space-y-6"
                onSubmit={handleSubmit(sendEmail)}
              >
                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 pointer-events-none">
                      <HiOutlineMail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      name="user_email"
                      type="email"
                      id="email"
                      {...register("user_email")}
                      className={`pl-8 sm:pl-10 bg-[#0a0a23]/50 border ${errors.user_email ? "border-red-500" : "border-gray-600"} focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 text-xs sm:text-sm rounded-lg block w-full p-2.5 sm:p-3`}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.user_email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.user_email.message}
                    </p>
                  )}
                </div>
                
                {/* Subject field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 pointer-events-none">
                      <BsChatLeftText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                    <input
                      name="subject"
                      type="text"
                      id="subject"
                      {...register("subject")}
                      className={`pl-8 sm:pl-10 bg-[#0a0a23]/50 border ${errors.subject ? "border-red-500" : "border-gray-600"} focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 text-xs sm:text-sm rounded-lg block w-full p-2.5 sm:p-3`}
                      placeholder="Let's discuss a project..."
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                
                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    {...register("message")}
                    className={`bg-[#0a0a23]/50 border ${errors.message ? "border-red-500" : "border-gray-600"} focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 text-xs sm:text-sm rounded-lg block w-full p-2.5 sm:p-3`}
                    placeholder="Hello John, I'm reaching out because..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                
                {/* Submit button */}
                <motion.button
                  type="submit"
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 mt-2 sm:mt-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="text-sm sm:text-base">Sending</span>
                      <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white rounded-full animate-spin border-t-transparent"></span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">Send Message</span>
                      <RiSendPlaneFill className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </motion.button>
                
                {/* Success message */}
                {emailSubmitted && (
                  <motion.div 
                    className="mt-4 p-2.5 sm:p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-xs sm:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="flex items-center">
                      <FaPaperPlane className="mr-2 flex-shrink-0" /> 
                      <span>Thank you for your message! I&apos;ll get back to you as soon as possible.</span>
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
