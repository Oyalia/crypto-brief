"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { briefSchema, type BriefSchema } from "@/lib/validations/brief";
import { motion, AnimatePresence } from "framer-motion";
import { submitBrief } from "./actions";
import { CheckCircle2, Bitcoin, Wallet, ArrowRightLeft, ShieldCheck, LineChart, Landmark, Coins, Search, Zap, LayoutDashboard, Globe, Lock, Users, Loader2, AlertCircle } from "lucide-react";

// Playful, bouncy animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

const projectTypes = [
  { id: "CEX", icon: Landmark, label: "Centralized Exchange", color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-500/20" },
  { id: "DEX", icon: ArrowRightLeft, label: "Decentralized (DEX)", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/20" },
  { id: "Wallet", icon: Wallet, label: "Crypto Wallet", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/20" },
  { id: "P2P", icon: Users, label: "P2P Platform", color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-500/20" },
];

const featureList = [
  { id: "Spot Trading", icon: LineChart },
  { id: "Margin/Futures", icon: Zap },
  { id: "Fiat Gateway", icon: Landmark },
  { id: "Staking/Earn", icon: Coins },
  { id: "KYC/AML System", icon: ShieldCheck },
  { id: "Multi-sig Security", icon: Lock },
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BriefSchema>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      features: [],
      projectType: "",
    },
  });

  const selectedType = watch("projectType");
  const selectedFeatures = watch("features");

  const onSubmit = async (data: BriefSchema) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const result = await submitBrief(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 6000);
    } else {
      alert("Oops! Something went wrong. Let's try that again.");
    }
  };

  const toggleFeature = (featureId: string) => {
    const current = selectedFeatures || [];
    const next = current.includes(featureId)
      ? current.filter((id) => id !== featureId)
      : [...current, featureId];
    setValue("features", next, { shouldValidate: true });
  };

  return (
    <main className="min-h-screen bg-[#FFFBF7] dark:bg-[#0B0D17] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative text-zinc-900 dark:text-zinc-100">
      
      {/* Crypto-themed floating background shapes (using deep purples and electric blues for a Web3 vibe) */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] left-[-10%] w-[30rem] h-[30rem] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-[100px] rotate-12 blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[-15%] w-[40rem] h-[40rem] bg-cyan-400/20 dark:bg-cyan-600/20 rounded-[120px] -rotate-12 blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, 20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[10%] w-[35rem] h-[35rem] bg-emerald-400/20 dark:bg-emerald-600/20 rounded-[80px] rotate-45 blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="inline-flex items-center justify-center px-5 py-2 mb-8 rounded-full bg-white dark:bg-zinc-800/80 border-2 border-indigo-100 dark:border-indigo-900 shadow-sm backdrop-blur-md"
          >
            <Bitcoin className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-sm font-bold tracking-wide text-indigo-600 dark:text-indigo-400 font-heading">WEB3 & EXCHANGE DEVELOPMENT</span>
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl mb-6 font-heading leading-tight">
            Launch Your <br/>
            <span className="relative inline-block">
              <span className="relative z-10 text-indigo-600 dark:text-indigo-400">Crypto Platform.</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-2 left-0 h-4 bg-indigo-200 dark:bg-indigo-900/50 -z-10 rounded-full"
              />
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            From high-performance matching engines to secure decentralized protocols. Tell us about your blockchain vision.
          </p>
        </motion.div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mb-10"
            >
              <div className="p-8 rounded-[32px] bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 flex flex-col items-center justify-center shadow-xl text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </motion.div>
                <h3 className="text-2xl font-black font-heading mb-2">Block Mined! 🚀</h3>
                <p className="text-lg font-medium">Your project brief is securely recorded. Our blockchain experts will be in touch shortly.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-10"
        >
          {/* Section 1: The Basics */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-white/50 dark:border-zinc-800 relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-200 dark:bg-indigo-700 rounded-full flex items-center justify-center shadow-lg rotate-12">
              <span className="font-heading font-black text-3xl text-indigo-900 dark:text-indigo-100">1</span>
            </div>
            
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 font-heading ml-8">Founders & Project</h2>
            
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Project / Company Name</label>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  type="text" {...register("companyName")} placeholder="e.g. Nexus Exchange"
                  className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 ${
                    errors.companyName ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-400"
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Lead Contact</label>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  type="text" {...register("contactPerson")} placeholder="Satoshi Nakamoto"
                  className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 ${
                    errors.contactPerson ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-400"
                  }`}
                />
                {errors.contactPerson && (
                  <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.contactPerson.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Email Address</label>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  type="email" {...register("email")} placeholder="founder@nexus.com"
                  className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 ${
                    errors.email ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-indigo-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Telegram / Discord</label>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  type="text" {...register("socialLinks")} placeholder="@founder_handle"
                  className="block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-900" 
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Location / Jurisdiction</label>
                <motion.input 
                  whileFocus={{ scale: 1.01 }}
                  type="text" {...register("location")} placeholder="e.g. US, EU, Offshore, Not registered"
                  className="block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-900" 
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Current Team Size</label>
                <div className="relative">
                  <select {...register("teamSize")}
                    className="appearance-none block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-900 cursor-pointer font-medium">
                    <option value="">Select size...</option>
                    <option value="Just me / Co-founders">Just me / Co-founders</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="50+">50+</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-zinc-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Funding Stage</label>
                <div className="relative">
                  <select {...register("fundingStage")}
                    className="appearance-none block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-indigo-400 focus:bg-white dark:focus:bg-zinc-900 cursor-pointer font-medium">
                    <option value="">Select stage...</option>
                    <option value="Bootstrapped (Self-funded)">Bootstrapped (Self-funded)</option>
                    <option value="Seed / Angel">Seed / Angel</option>
                    <option value="Series A+">Series A+</option>
                    <option value="Looking for investment">Looking for investment</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-zinc-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Architecture */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-cyan-100/50 dark:shadow-none border border-white/50 dark:border-zinc-800 relative">
             <div className="absolute -top-6 -right-6 w-16 h-16 bg-cyan-200 dark:bg-cyan-700 rounded-full flex items-center justify-center shadow-lg -rotate-12">
              <span className="font-heading font-black text-3xl text-cyan-900 dark:text-cyan-100">2</span>
            </div>

            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 font-heading">Platform Architecture</h2>
            
            <div className="space-y-10">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4 ml-2 uppercase tracking-wide">Core Product Type</label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {projectTypes.map((type) => {
                    const isSelected = selectedType === type.id;
                    const Icon = type.icon;
                    return (
                      <motion.div 
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        key={type.id} 
                        onClick={() => setValue("projectType", type.id, { shouldValidate: true })}
                        className={`cursor-pointer rounded-3xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                          isSelected 
                            ? `border-${type.color.split('-')[1]}-400 ${type.bg} ${type.color} shadow-lg` 
                            : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 hover:bg-white dark:hover:bg-zinc-800"
                        }`}
                      >
                        <Icon className={`w-10 h-10 mb-4 ${isSelected ? type.color : "text-zinc-400"}`} strokeWidth={isSelected ? 2.5 : 2} />
                        <span className="text-sm font-bold font-heading">{type.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
                {errors.projectType && (
                  <p className="mt-4 text-center text-sm font-bold text-rose-500 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.projectType.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Target Blockchains & Networks</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" {...register("projectNiche")} placeholder="e.g. Ethereum, Solana, Base, Bitcoin (Lightning)"
                    className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 ${
                      errors.projectNiche ? "border-rose-400 focus:border-rose-500" : "border-cyan-200 dark:border-zinc-700 focus:border-cyan-400"
                    }`}
                  />
                  {errors.projectNiche && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.projectNiche.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Liquidity & Matching Strategy</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    {...register("goals")} rows={3} placeholder="Are you integrating with external liquidity providers (Binance/Kraken) or using an internal matching engine/AMM?"
                    className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 resize-none ${
                      errors.goals ? "border-rose-400 focus:border-rose-500" : "border-cyan-200 dark:border-zinc-700 focus:border-cyan-400"
                    }`}></motion.textarea>
                  {errors.goals && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.goals.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Target Users</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    {...register("targetAudience")} rows={3} placeholder="Retail traders, Institutions, Degen traders?"
                    className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 resize-none ${
                      errors.targetAudience ? "border-rose-400 focus:border-rose-500" : "border-cyan-200 dark:border-zinc-700 focus:border-cyan-400"
                    }`}></motion.textarea>
                  {errors.targetAudience && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.targetAudience.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Competitors</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    {...register("competitors")} rows={2} placeholder="e.g. Uniswap, Binance, Coinbase"
                    className="block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-cyan-400 focus:bg-white dark:focus:bg-zinc-900 resize-none"></motion.textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Expected Volume</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="text" {...register("expectedVolume")} placeholder="e.g. 10k users/day, $1M TVL"
                    className="block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-cyan-400 focus:bg-white dark:focus:bg-zinc-900" 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Technical Specs */}
          <motion.div variants={itemVariants} className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-emerald-100/50 dark:shadow-none border border-white/50 dark:border-zinc-800 relative">
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-emerald-200 dark:bg-emerald-700 rounded-full flex items-center justify-center shadow-lg rotate-6">
              <span className="font-heading font-black text-3xl text-emerald-900 dark:text-emerald-100">3</span>
            </div>

            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 font-heading text-center">Technical Specs</h2>
            
            <div className="space-y-10">
              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4 ml-2 uppercase tracking-wide text-center">Must-have Exchange Modules</label>
                <div className="flex flex-wrap gap-3 justify-center">
                  {featureList.map((feature) => {
                    const isSelected = selectedFeatures.includes(feature.id);
                    return (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`cursor-pointer rounded-full border-2 px-5 py-3 flex items-center transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shadow-md"
                            : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:border-emerald-200 dark:hover:border-emerald-800"
                        }`}
                      >
                        <feature.icon className="w-5 h-5 mr-2" />
                        <span className="font-bold">{feature.id}</span>
                      </motion.div>
                    )
                  })}
                </div>
                {errors.features && (
                  <p className="mt-4 text-center text-sm font-bold text-rose-500 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> {errors.features.message}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 pt-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Investment / Budget</label>
                  <div className="relative">
                    <select {...register("budget")}
                      className={`appearance-none block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 cursor-pointer font-medium ${
                        errors.budget ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-400"
                      }`}>
                      <option value="">Select capital range...</option>
                      <option value="&lt; $25,000">Seed (&lt; $25k)</option>
                      <option value="$25,000 - $100,000">MVP ($25k - $100k)</option>
                      <option value="$100,000 - $250,000">Growth ($100k - $250k)</option>
                      <option value="$250,000+">Enterprise ($250k+)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-zinc-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.budget && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.budget.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Target Mainnet Launch</label>
                  <motion.input 
                    whileFocus={{ scale: 1.01 }}
                    type="date" {...register("deadline")}
                    className={`block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 font-medium ${
                      errors.deadline ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-400"
                    }`}
                  />
                  {errors.deadline && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.deadline.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Regulatory Requirements & Compliance (KYC)</label>
                  <div className="relative">
                    <select {...register("complianceLevel")}
                      className={`appearance-none block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 cursor-pointer font-medium ${
                        errors.complianceLevel ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-400"
                      }`}>
                      <option value="">Select compliance level...</option>
                      <option value="Full KYC / AML (Regulated)">Full KYC / AML (Regulated)</option>
                      <option value="Light KYC">Light KYC</option>
                      <option value="No KYC / Fully Decentralized">No KYC / Fully Decentralized</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-zinc-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.complianceLevel && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.complianceLevel.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Desired Tech Stack</label>
                  <div className="relative">
                    <select {...register("techStack")}
                      className={`appearance-none block w-full rounded-2xl border-2 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:bg-white dark:focus:bg-zinc-900 cursor-pointer font-medium ${
                        errors.techStack ? "border-rose-400 focus:border-rose-500" : "border-zinc-200 dark:border-zinc-700 focus:border-emerald-400"
                      }`}>
                      <option value="">Select a stack...</option>
                      <option value="MERN / Node.js">MERN / Node.js</option>
                      <option value="Rust / Go (High Performance)">Rust / Go (High Performance)</option>
                      <option value="Web3 Native (Solidity/EVM)">Web3 Native (Solidity/EVM)</option>
                      <option value="Up to Developer (На вибір розробника)">Up to Developer (На вибір розробника)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none text-zinc-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  {errors.techStack && (
                    <p className="mt-2 ml-2 text-sm font-bold text-rose-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" /> {errors.techStack.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 ml-2 uppercase tracking-wide">Final Thoughts</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01 }}
                    {...register("comments")} rows={3} placeholder="Any other spicy details? Or specific licenses?"
                    className="block w-full rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-6 py-4 text-lg outline-none transition-colors focus:border-emerald-400 focus:bg-white dark:focus:bg-zinc-900 resize-none"></motion.textarea>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex justify-center items-center rounded-full bg-indigo-600 dark:bg-indigo-500 py-5 px-12 text-xl font-black text-white shadow-2xl hover:shadow-indigo-500/25 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-70 transition-all overflow-hidden font-heading"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                    Signing Transaction...
                  </>
                ) : (
                  <>
                    Submit Architecture Brief
                    <Zap className="ml-3 h-6 w-6" />
                  </>
                )}
              </span>
            </motion.button>
            <p className="mt-6 text-sm font-bold text-zinc-400 uppercase tracking-widest">
              Secured by end-to-end encryption 🔒
            </p>
          </motion.div>
        </motion.form>
      </div>
    </main>
  );
}
