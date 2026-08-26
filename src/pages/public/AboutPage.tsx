import { useEffect, useState } from 'react';
import {
  Mail,
  Linkedin,
  MapPin,
  Phone,
  Globe2,
  Microscope,
  HeartPulse,
  BarChart3,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

import type {
  Profile,
  Skill,
  ResearchInterest,
} from '@/types/database';

import {
  getProfile,
  fetchSkills,
  fetchResearchInterests,
} from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';
import {
  LoadingSpinner,
  ErrorState,
} from '@/components/ui/States';

export function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<ResearchInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      getProfile(),
      fetchSkills(),
      fetchResearchInterests(),
    ])
      .then(([profileData, skillsData, interestsData]) => {
        setProfile(profileData);
        setSkills(skillsData);
        setInterests(interestsData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error) {
    return <ErrorState message="Failed to load profile information." />;
  }

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }

      acc[skill.category].push(skill);

      return acc;
    },
    {}
  );

  const values = [
    {
      icon: Microscope,
      title: 'Research & Evidence',
      desc: 'Applying scientific methods and evidence-based approaches to address important public health challenges.',
    },
    {
      icon: HeartPulse,
      title: 'Community Impact',
      desc: 'Committed to improving health outcomes and supporting underserved communities.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Decisions',
      desc: 'Using research, analytics, and evidence to support informed healthcare decisions.',
    },
    {
      icon: Globe2,
      title: 'Global Perspective',
      desc: 'Bringing experience and perspectives from different communities and international environments.',
    },
  ];

  return (
     <div>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-20 sm:pt-32 sm:pb-24">

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-iris-500/10 blur-[120px]" />

        <div className="container-page relative">

          <Reveal>




            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
              About John
            </span>

            <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

              Advancing Public Health Through Research,
              <span className="text-accent-400">
                {' '}Data & Community Impact.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">

              A public health professional committed to research,
              evidence-based practice, healthcare development, and
              improving outcomes for communities.

            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          MAIN ABOUT SECTION
      ===================================================== */}

      <section className="section-padding">

        <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">


          {/* =====================
              PROFILE IMAGE + CONTACT
          ===================== */}

          <Reveal className="lg:col-span-2">

            <div className="relative">

              {/* Background decoration */}

              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-100 via-transparent to-iris-100 opacity-70" />


              {/* Profile Image */}

              {profile?.profile_image_url ? (

                <img
                  src={profile.profile_image_url}
                  alt={profile.full_name}
                  className="
                    relative
                    h-[500px]
                    w-full
                    rounded-2xl
                    border
                    border-slate-100
                    object-cover
                    object-center
                    shadow-card
                    sm:h-[580px]
                  "
                />

              ) : (

                <div
                  className="
                    relative
                    flex
                    h-[500px]
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-100
                    text-sm
                    text-slate-500
                    sm:h-[580px]
                  "
                >
                  Profile image unavailable
                </div>

              )}


              {/* Professional badge */}

              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  rounded-2xl
                  border
                  border-white/20
                  bg-navy-950/90
                  p-5
                  text-white
                  shadow-xl
                  backdrop-blur-xl
                "
              >

                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Public Health Professional
                </p>

                <h3 className="mt-2 font-display text-xl font-bold">

                  {profile?.full_name}

                </h3>

                <p className="mt-1 text-sm text-slate-300">

                  {profile?.professional_title}

                </p>

              </div>

            </div>


            {/* =====================
                CONTACT INFORMATION
            ===================== */}

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-6
                shadow-soft
              "
            >

              <div className="mb-5 flex items-center justify-between">

                <h3 className="font-display text-lg font-bold text-navy-900">
                  Contact Information
                </h3>

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

              </div>


              <div className="space-y-4 text-sm">


                {profile?.email && (

                  <a
                    href={`mailto:${profile.email}`}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      text-slate-600
                      transition-colors
                      hover:text-accent-600
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-accent-50
                        text-accent-600
                      "
                    >
                      <Mail className="h-4 w-4" />
                    </span>

                    <span>{profile.email}</span>

                  </a>

                )}


                {profile?.phone && (

                  <a
                    href={`tel:${profile.phone}`}
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-600
                      transition-colors
                      hover:text-accent-600
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-accent-50
                        text-accent-600
                      "
                    >
                      <Phone className="h-4 w-4" />
                    </span>

                    <span>{profile.phone}</span>

                  </a>

                )}


                {profile?.location && (

                  <div className="flex items-center gap-3 text-slate-600">

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-accent-50
                        text-accent-600
                      "
                    >
                      <MapPin className="h-4 w-4" />
                    </span>

                    <span>{profile.location}</span>

                  </div>

                )}


                {profile?.linkedin_url && (

                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-600
                      transition-colors
                      hover:text-accent-600
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-accent-50
                        text-accent-600
                      "
                    >
                      <Linkedin className="h-4 w-4" />
                    </span>

                    <span className="flex items-center gap-1">

                      LinkedIn Profile

                      <ArrowUpRight className="h-3.5 w-3.5" />

                    </span>

                  </a>

                )}

              </div>

            </div>

          </Reveal>


          {/* =====================
              PROFESSIONAL BIOGRAPHY
          ===================== */}

          <div className="lg:col-span-3">

            <Reveal>

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
                Professional Biography
              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Building Healthier Communities Through Knowledge & Action

              </h2>

            </Reveal>


            <Reveal delay={0.1}>

              <div className="mt-7 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600">

                {profile?.full_bio || profile?.short_bio}

              </div>

            </Reveal>


            {/* =====================
                PROFESSIONAL VALUES
            ===================== */}

            <Reveal delay={0.2}>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {values.map((value) => {

                  const Icon = value.icon;

                  return (

                    <div
                      key={value.title}
                      className="
                        group
                        rounded-2xl
                        border
                        border-slate-100
                        bg-white
                        p-5
                        shadow-soft
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-card
                      "
                    >

                      <span
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          bg-accent-50
                          text-accent-600
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      >

                        <Icon className="h-5 w-5" />

                      </span>


                      <h3 className="mt-4 font-bold text-navy-900">

                        {value.title}

                      </h3>


                      <p className="mt-2 text-sm leading-relaxed text-slate-500">

                        {value.desc}

                      </p>

                    </div>

                  );

                })}

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section className="border-y border-slate-100 bg-slate-50 section-padding">

        <div className="container-page">

          <Reveal>

            <div className="mx-auto mb-12 max-w-2xl text-center">

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
                Skills & Competencies
              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Technical & Professional Expertise

              </h2>

              <p className="mt-4 text-slate-500">

                A combination of public health knowledge, research
                experience, analytical thinking, and professional skills.

              </p>

            </div>

          </Reveal>


          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {Object.entries(skillsByCategory).map(
              ([category, items], index) => (

                <Reveal
                  key={category}
                  delay={index * 0.1}
                >

                  <div
                    className="
                      h-full
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      p-6
                      shadow-soft
                    "
                  >

                    <div className="mb-5 flex items-center gap-3">

                      <span
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-accent-50
                          text-accent-600
                        "
                      >
                        <BookOpen className="h-5 w-5" />
                      </span>

                      <h3 className="font-bold text-navy-900">

                        {category}

                      </h3>

                    </div>


                    <div className="flex flex-wrap gap-2">

                      {items.map((skill) => (

                        <span
                          key={skill.id}
                          className="
                            rounded-lg
                            border
                            border-slate-100
                            bg-slate-50
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-700
                          "
                        >

                          {skill.name}

                        </span>

                      ))}

                    </div>

                  </div>

                </Reveal>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          RESEARCH INTERESTS
      ===================================================== */}

      <section className="section-padding">

        <div className="container-page">

          <Reveal>

            <div className="mx-auto mb-12 max-w-2xl text-center">

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">
                Research Interests
              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Areas of Research & Focus

              </h2>

              <p className="mt-4 text-slate-500">

                Exploring important areas of public health, healthcare,
                research, and community development.

              </p>

            </div>

          </Reveal>


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {interests.map((interest, index) => (

              <Reveal
                key={interest.id}
                delay={index * 0.08}
              >

                <div
                  className="
                    group
                    h-full
                    rounded-2xl
                    border
                    border-slate-100
                    bg-white
                    p-6
                    shadow-soft
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-accent-200
                    hover:shadow-card
                  "
                >

                  <div className="mb-5 h-1.5 w-10 rounded-full bg-accent-500 transition-all duration-300 group-hover:w-16" />

                  <h3 className="font-display text-lg font-bold text-navy-900">

                    {interest.title}

                  </h3>

                  {interest.description && (

                    <p className="mt-3 text-sm leading-relaxed text-slate-500">

                      {interest.description}

                    </p>

                  )}

                </div>

              </Reveal>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}