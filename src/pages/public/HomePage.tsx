import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Mail,
  Linkedin,
  Globe2,
  Activity,
  GraduationCap,
  Briefcase,
  Microscope,
  HeartPulse,
  BarChart3,
  Baby,
  Smartphone,
  Network,
} from 'lucide-react';

import type {
  Profile,
  Publication,
  Experience,
  ResearchInterest,
  Education,
} from '@/types/database';

import {
  getProfile,
  fetchFeaturedPublications,
  fetchExperiences,
  fetchResearchInterests,
  fetchEducation,
} from '@/lib/dataService';

import { Reveal, AnimatedNumber } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';

const PROFILE_IMG = '/images/john-jallah.png';

const iconMap: Record<string, typeof Activity> = {
  Activity,
  BarChart3,
  Microscope,
  HeartPulse,
  Baby,
  Smartphone,
  Network,
  Globe2,
};

export function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [interests, setInterests] = useState<ResearchInterest[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      getProfile(),
      fetchFeaturedPublications(),
      fetchExperiences(),
      fetchResearchInterests(),
      fetchEducation(),
    ])
      .then(([p, pubs, exps, ints, edu]) => {
        setProfile(p);
        setPublications(pubs);
        setExperiences(exps);
        setInterests(ints);
        setEducation(edu);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <ErrorState message="Failed to load content. Please refresh the page." />
    );
  }

  const stats = [
    {
      label: 'Professional Roles',
      value: experiences.length,
      icon: Briefcase,
    },
    {
      label: 'Publications',
      value: publications.length,
      icon: FileText,
    },
    {
      label: 'Education',
      value: education.length,
      icon: GraduationCap,
    },
    {
      label: 'Research Areas',
      value: interests.length,
      icon: Microscope,
    },
  ];

  return (
    <div>

     {/* =========================================================
    HERO SECTION
========================================================= */}

<section
  className="
    relative
    min-h-[900px]
    overflow-hidden
    bg-[#020916]
    pt-20
    lg:min-h-[760px]
    lg:h-screen
    lg:max-h-[960px]
  "
>

  {/* =======================================================
      BACKGROUND LIGHTING
  ======================================================= */}

  <div
    className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_72%_40%,rgba(31,69,135,0.22),transparent_30%),radial-gradient(circle_at_30%_75%,rgba(20,43,83,0.18),transparent_32%)]
    "
  />

  {/* Background network */}

  <div
    className="
      network-pattern
      absolute
      right-[18%]
      top-[7%]
      h-[480px]
      w-[600px]
    "
  />

  {/* Decorative circles */}

  <div
    className="
      absolute
      right-[16%]
      top-[15%]
      h-72
      w-72
      rounded-full
      border
      border-accent-500/10
    "
  />

  <div
    className="
      absolute
      right-[22%]
      top-[22%]
      h-52
      w-52
      rounded-full
      border
      border-accent-500/10
    "
  />


  {/* =======================================================
      MAIN HERO CONTAINER
  ======================================================= */}

  <div
    className="
      container-page
      relative
      z-20
      h-full
    "
  >

    {/* =====================================================
        MOBILE PROFILE IMAGE

        This exists ONLY on mobile.
        Desktop keeps using the existing desktop image.
    ===================================================== */}

  <div
  className="
    pointer-events-none
    absolute
    bottom-[390px]
    right-[-55px]
    z-10
    block
    h-[650px]
    w-[380px]
    sm:right-[-20px]
    sm:bottom-[380px]
    sm:h-[700px]
    sm:w-[430px]
    lg:hidden
  "
>

      <Reveal
        delay={0.25}
        className="h-full"
      >

        <div className="relative h-full w-full">

          {/* Soft glow behind portrait */}

          <div
            className="
              absolute
              right-10
              top-24
              h-72
              w-72
              rounded-full
              bg-accent-500/10
              blur-3xl
            "
          />

          <img
            src={PROFILE_IMG}
            alt="John Kessellie Jallah"
            className="
              absolute
              bottom-0
              right-0
              h-[100%]
              w-auto
              max-w-none
              object-contain
              object-bottom
              drop-shadow-[0_0_45px_rgba(54,91,160,0.25)]
            "
          />

        </div>

      </Reveal>

    </div>


    {/* =====================================================
        LEFT / MAIN CONTENT

        Mobile content sits ABOVE the portrait.
    ===================================================== */}

    <div
      className="
        relative
        z-30
        flex
        h-full
        flex-col
        justify-start
        pb-8
        pt-10
        lg:grid
        lg:grid-cols-12
        lg:items-center
        lg:pt-0
      "
    >

      {/* ===================================================
          CONTENT COLUMN
      =================================================== */}

      <div
        className="
          relative
          z-30
          w-full
          lg:col-span-6
          lg:pb-0
        "
      >

        {/* =================================================
            PROFESSIONAL BADGE
        ================================================= */}

        <Reveal>

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/25
              bg-white/[0.03]
              px-4
              py-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/80
              sm:text-[11px]
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-accent-400
              "
            />

            Public Health Professional

          </span>

        </Reveal>


        {/* =================================================
            NAME
        ================================================= */}

        <Reveal delay={0.1}>

          <h1
            className="
              mt-7
              max-w-[340px]
              font-display
              text-[3.35rem]
              font-extrabold
              leading-[0.91]
              tracking-[-0.055em]
              text-white
              sm:max-w-[430px]
              sm:text-[4.25rem]
              lg:max-w-none
              lg:whitespace-nowrap
              lg:text-[5.2rem]
              lg:leading-[0.98]
            "
          >

            <span className="block">
              John
            </span>

            <span className="block">
              Kessellie
            </span>

            <span className="gradient-text block">
              Jallah
            </span>

          </h1>

        </Reveal>


        {/* =================================================
            TAGLINE
        ================================================= */}

        <Reveal delay={0.2}>

          <p
            className="
              mt-7
              max-w-[320px]
              text-[15px]
              font-medium
              leading-relaxed
              text-white/75
              sm:max-w-[440px]
              sm:text-lg
              lg:max-w-none
            "
          >

            {profile?.hero_tagline ||
              'Health Researcher • Data-Driven • Community Impact'}

          </p>

        </Reveal>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <Reveal delay={0.3}>

          <p
            className="
              mt-4
              max-w-[315px]
              text-[13px]
              leading-[1.65]
              text-white/65
              sm:max-w-[460px]
              sm:text-base
              sm:leading-[1.75]
              lg:max-w-xl
            "
          >

            Dedicated to improving population health and addressing health
            disparities through research, data analysis, and community health
            initiatives. Passionate about leveraging evidence and innovation
            to create sustainable health solutions.

          </p>

        </Reveal>


        {/* =================================================
            MOBILE BUTTONS

            Desktop button layout is preserved.
        ================================================= */}

        <Reveal delay={0.4}>

          <div
            className="
              mt-7
              flex
              w-full
              max-w-[300px]
              flex-col
              gap-3
              sm:max-w-none
              sm:flex-row
              sm:flex-wrap
              lg:mt-8
            "
          >

            <Link
              to="/publications"
              className="w-full sm:w-auto"
            >

              <Button
                size="lg"
                className="
                  h-12
                  w-full
                  rounded-lg
                  bg-accent-500
                  px-6
                  shadow-[0_8px_30px_rgba(59,130,246,0.22)]
                  hover:bg-accent-400
                  sm:w-auto
                "
              >

                Explore My Work

                <ArrowRight className="h-4 w-4" />

              </Button>

            </Link>


            <Link
              to="/publications"
              className="w-full sm:w-auto"
            >

              <Button
                size="lg"
                variant="ghost"
                className="
                  h-12
                  w-full
                  rounded-lg
                  border
                  border-white/25
                  bg-transparent
                  px-6
                  text-white
                  hover:bg-white/10
                  sm:w-auto
                "
              >

                <FileText className="h-4 w-4" />

                View Publications

              </Button>

            </Link>


            <a
              href={`mailto:${profile?.email || ''}`}
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-white/25
                text-white
                transition-colors
                hover:bg-white/10
                sm:w-12
              "
              aria-label="Email"
            >

              <Mail className="h-5 w-5" />

              <span className="sm:hidden">
                Email Me
              </span>

            </a>

          </div>

        </Reveal>


        {/* =================================================
            SOCIAL LINKS

            Slightly reduced on mobile.
        ================================================= */}

        <Reveal delay={0.5}>

          <div
            className="
              mt-6
              flex
              items-center
              gap-4
              sm:mt-8
            "
          >

            <a
              href={profile?.linkedin_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                text-xs
                text-white/75
                transition-colors
                hover:text-white
                sm:text-sm
              "
            >

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  bg-[#0a294c]
                  text-accent-400
                "
              >

                <Linkedin className="h-4 w-4" />

              </span>

              LinkedIn

            </a>


            <span className="h-5 w-px bg-white/25" />


            <a
              href={`mailto:${profile?.email || ''}`}
              className="
                flex
                items-center
                gap-2
                text-xs
                text-white/75
                transition-colors
                hover:text-white
                sm:text-sm
              "
            >

              <Mail className="h-4 w-4" />

              Email

            </a>

          </div>

        </Reveal>

      </div>


      {/* ===================================================
          DESKTOP PROFILE IMAGE

          UNCHANGED DESKTOP BEHAVIOR
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-[40%]
          z-10
          hidden
          w-[40%]
          lg:block
        "
      >

        <Reveal
          delay={0.25}
          className="h-full"
        >

          <div className="relative h-full w-full">

            <img
              src={PROFILE_IMG}
              alt="John Kessellie Jallah"
              className="
                absolute
                bottom-0
                left-1/2
                h-[85%]
                w-auto
                max-w-none
                -translate-x-1/2
                object-contain
                object-bottom
                drop-shadow-[0_0_45px_rgba(54,91,160,0.20)]
              "
            />

          </div>

        </Reveal>

      </div>


      {/* ===================================================
          INFORMATION CARD

          Desktop = floating right card
          Mobile = positioned normally near bottom
      =================================================== */}

     <Reveal
  delay={0.45}
  className="
    relative
    z-40
    mt-24
    block
    w-full
    lg:absolute
    lg:bottom-[45%]
    lg:left-auto
    lg:right-[1.5%]
    lg:mt-0
    lg:w-[310px]
    lg:block
  "
>

       <div
  className="
    w-full
    rounded-[16px]
    border
    border-white/20
    bg-[#0b1b33]/95
    p-4
    shadow-[0_20px_50px_rgba(0,0,0,0.35)]
    backdrop-blur-xl
    sm:p-5
  "
>

          {/* =================================================
              PUBLIC HEALTH
          ================================================= */}

          <div
            className="
              flex
              items-start
              gap-3
              border-b
              border-white/15
              pb-4
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-accent-400/30
                bg-accent-500/10
                text-accent-300
                sm:h-11
                sm:w-11
              "
            >

              <GraduationCap className="h-[18px] w-[18px]" />

            </span>


            <div className="min-w-0">

              <p className="text-sm font-bold text-white">
                Public Health
              </p>

              <p className="mt-0.5 text-sm font-semibold text-white/90">
                Postgraduate Diploma
              </p>

              <p className="mt-2 text-[11px] text-white/60">
                In Progress
              </p>

              <p className="mt-0.5 text-[11px] text-white/60">
                (Completion: July 2026)
              </p>

            </div>

          </div>


          {/* =================================================
              B.SC HEALTH SCIENCES
          ================================================= */}

          <div
            className="
              flex
              items-start
              gap-3
              border-b
              border-white/15
              py-4
            "
          >

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-accent-400/30
                bg-accent-500/10
                text-accent-300
                sm:h-11
                sm:w-11
              "
            >

              <Microscope className="h-[18px] w-[18px]" />

            </span>


            <div>

              <p className="text-sm font-bold text-white">
                B.Sc. Health Sciences
              </p>

              <p className="mt-2 text-xs text-white/65">
                CGPA: 8.29/10
              </p>

              <p className="mt-1 text-xs text-white/60">
                July 2025
              </p>

            </div>

          </div>


          {/* =================================================
              PUBLICATIONS
          ================================================= */}

          <div className="flex items-center gap-3 pt-4">

            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-accent-400/30
                bg-accent-500/10
                text-accent-300
                sm:h-11
                sm:w-11
              "
            >

              <FileText className="h-[18px] w-[18px]" />

            </span>


            <div>

              <p className="text-2xl font-extrabold leading-none text-white">
                {publications.length || 6}+
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                Peer-Reviewed
                <br />
                Publications
              </p>

            </div>

          </div>

        </div>

      </Reveal>

    </div>

  </div>

</section>


      {/* =========================================================
          STATS BAR
      ========================================================= */}

      <section className="relative z-20 mt-0">

        <div className="container-page">

          <div className="grid grid-cols-2 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-card lg:grid-cols-4">

            {stats.map((stat, i) => {

              const Icon = stat.icon;

              return (

                <Reveal
                  key={stat.label}
                  delay={i * 0.1}
                >

                  <div className="flex flex-col items-center justify-center px-4 py-7 text-center">

                    <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">

                      <Icon className="h-5 w-5" />

                    </span>


                    <p className="font-display text-3xl font-extrabold text-navy-900">

                      <AnimatedNumber
                        value={stat.value}
                        suffix="+"
                      />

                    </p>


                    <p className="mt-1 text-xs font-medium text-slate-500">

                      {stat.label}

                    </p>

                  </div>

                </Reveal>

              );

            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          ABOUT PREVIEW
      ========================================================= */}

      <section className="section-padding">

        <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* About Image */}

          <Reveal>

            <div className="relative">

              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-100 to-iris-100 opacity-50" />

              <img
                src={PROFILE_IMG}
                alt="John Kessellie Jallah"
                className="relative h-[480px] w-full rounded-2xl bg-navy-950 object-contain object-bottom shadow-card"
              />

            </div>

          </Reveal>


          {/* About Content */}

          <div>

            <Reveal>

              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">
                About Me
              </span>

            </Reveal>


            <Reveal delay={0.1}>

              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">

                Committed to Better Health Outcomes for All

              </h2>

            </Reveal>


            <Reveal delay={0.2}>

              <p className="mt-5 leading-relaxed text-slate-600">

                {profile?.full_bio?.slice(0, 350) ||
                  profile?.short_bio}
                …

              </p>

            </Reveal>


            {/* About Values */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {[
                {
                  icon: Microscope,
                  title: 'Research & Evidence',
                  desc: 'Rigorous, data-driven inquiry',
                },
                {
                  icon: HeartPulse,
                  title: 'Community Impact',
                  desc: 'Health equity for underserved',
                },
                {
                  icon: BarChart3,
                  title: 'Data-Driven Decisions',
                  desc: 'Analytics for better outcomes',
                },
                {
                  icon: Globe2,
                  title: 'Global Perspective',
                  desc: 'Cross-cultural health experience',
                },
              ].map((val, i) => {

                const Icon = val.icon;

                return (

                  <Reveal
                    key={val.title}
                    delay={0.3 + i * 0.1}
                  >

                    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-soft transition-shadow hover:shadow-card">

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">

                        <Icon className="h-4 w-4" />

                      </span>


                      <div>

                        <p className="text-sm font-bold text-navy-900">

                          {val.title}

                        </p>


                        <p className="mt-0.5 text-xs text-slate-500">

                          {val.desc}

                        </p>

                      </div>

                    </div>

                  </Reveal>

                );

              })}

            </div>


            {/* More About Me */}

            <Reveal delay={0.7}>

              <Link
                to="/about"
                className="mt-8 inline-block"
              >

                <Button
                  variant="outline"
                  size="md"
                >

                  More About Me

                  <ArrowRight className="h-4 w-4" />

                </Button>

              </Link>

            </Reveal>

          </div>

        </div>

      </section>

    </div>
  );
}