import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Calendar,
  Tag,
  Users,
  BookMarked,
  Sparkles,
  BookOpen,
  Download,
  Link as LinkIcon,
} from 'lucide-react';

import type { Publication } from '@/types/database';
import {
  fetchPublicationById,
  fetchPublications,
} from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';

import { Button } from '@/components/ui/Button';

export function PublicationDetailPage() {
  const { id } = useParams();

  const [publication, setPublication] =
    useState<Publication | null>(null);

  const [related, setRelated] =
    useState<Publication[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    Promise.all([
      fetchPublicationById(id),
      fetchPublications(),
    ])
      .then(([pub, allPubs]) => {
        setPublication(pub);

        if (pub) {
          setRelated(
            allPubs
              .filter(
                (item) =>
                  item.id !== pub.id &&
                  item.category === pub.category
              )
              .slice(0, 3)
          );
        }

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <ErrorState message="Failed to load publication." />
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="pt-20">
        <EmptyState message="Publication not found." />
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-16 sm:pt-32 sm:pb-20">

        {/* Background */}

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

        <div className="absolute bottom-[-180px] left-[-120px] h-[350px] w-[350px] rounded-full bg-iris-500/10 blur-[120px]" />


        <div className="container-page relative">


          {/* BACK BUTTON */}

          <Link
            to="/publications"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-white/50
              transition-colors
              hover:text-white
            "
          >

            <span className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
            ">

              <ArrowLeft className="h-4 w-4" />

            </span>

            Back to Publications

          </Link>


          {/* HERO CONTENT */}

          <Reveal>

            <div className="mt-10 max-w-4xl">


              {/* CATEGORY */}

              <div className="flex flex-wrap items-center gap-3">

                <span className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  text-accent-400
                ">

                  <BookOpen className="h-5 w-5" />

                </span>


                <span className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-accent-400
                ">

                  {publication.category || 'Research'}

                </span>


                {publication.is_featured && (

                  <span className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-iris-400/20
                    bg-iris-400/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-iris-300
                  ">

                    <Sparkles className="h-3.5 w-3.5" />

                    Featured Publication

                  </span>

                )}

              </div>


              {/* TITLE */}

              <h1 className="
                mt-6
                font-display
                text-3xl
                font-extrabold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              ">

                {publication.title}

              </h1>


              {/* AUTHORS */}

              {publication.authors && (

                <div className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/60
                ">

                  <Users className="h-4 w-4 text-accent-400" />

                  <span>

                    {publication.authors}

                  </span>

                </div>

              )}


              {/* META */}

              <div className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                text-sm
                text-white/45
              ">

                {publication.publication_year && (

                  <span className="flex items-center gap-2">

                    <Calendar className="h-4 w-4 text-accent-400" />

                    {publication.publication_year}

                  </span>

                )}


                {publication.journal && (

                  <span className="flex items-center gap-2">

                    <BookMarked className="h-4 w-4 text-accent-400" />

                    {publication.journal}

                  </span>

                )}

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="relative py-20 sm:py-24 lg:py-28">

        <div className="container-page max-w-6xl">


          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">


            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="space-y-8 lg:col-span-2">


              {/* ABSTRACT */}

              {publication.abstract && (

                <Reveal>

                  <article className="
                    rounded-3xl
                    border
                    border-slate-200/70
                    bg-white
                    p-6
                    shadow-soft
                    sm:p-8
                  ">


                    <div className="mb-6 flex items-center gap-3">

                      <span className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-accent-50
                        text-accent-600
                      ">

                        <FileText className="h-5 w-5" />

                      </span>


                      <div>

                        <span className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-accent-600
                        ">

                          Research Overview

                        </span>


                        <h2 className="
                          mt-1
                          font-display
                          text-2xl
                          font-extrabold
                          text-navy-900
                        ">

                          Abstract

                        </h2>

                      </div>

                    </div>


                    <div className="
                      border-l-2
                      border-accent-400
                      pl-5
                    ">

                      <p className="
                        text-sm
                        leading-8
                        text-slate-600
                        sm:text-base
                      ">

                        {publication.abstract}

                      </p>

                    </div>

                  </article>

                </Reveal>

              )}


              {/* ACTION BUTTONS */}

              {(publication.publication_url ||
                publication.publication_file) && (

                <Reveal delay={0.08}>

                  <div className="
                    rounded-3xl
                    border
                    border-slate-200/70
                    bg-white
                    p-6
                    shadow-soft
                    sm:p-8
                  ">


                    <div className="
                      flex
                      flex-col
                      justify-between
                      gap-6
                      sm:flex-row
                      sm:items-center
                    ">


                      <div>

                        <span className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-accent-600
                        ">

                          Access Publication

                        </span>


                        <h3 className="
                          mt-1
                          font-display
                          text-xl
                          font-bold
                          text-navy-900
                        ">

                          Read the Full Research

                        </h3>


                        <p className="
                          mt-2
                          max-w-md
                          text-sm
                          leading-relaxed
                          text-slate-500
                        ">

                          Access the full publication or download the
                          available research document.

                        </p>

                      </div>


                      <div className="
                        flex
                        flex-wrap
                        gap-3
                      ">


                        {publication.publication_url && (

                          <a
                            href={publication.publication_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            <Button
                              variant="primary"
                              size="lg"
                            >

                              <ExternalLink className="h-4 w-4" />

                              View Publication

                            </Button>

                          </a>

                        )}


                        {publication.publication_file && (

                          <a
                            href={publication.publication_file}
                            target="_blank"
                            rel="noopener noreferrer"
                          >

                            <Button
                              variant="outline"
                              size="lg"
                            >

                              <Download className="h-4 w-4" />

                              Download PDF

                            </Button>

                          </a>

                        )}

                      </div>

                    </div>

                  </div>

                </Reveal>

              )}

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-5">


              <Reveal delay={0.1}>

                <div className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200/70
                  bg-white
                  shadow-soft
                ">


                  {/* HEADER */}

                  <div className="
                    border-b
                    border-slate-100
                    bg-slate-50/70
                    px-6
                    py-5
                  ">

                    <div className="flex items-center gap-3">

                      <span className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-accent-500
                        to-iris-500
                        text-white
                        shadow-sm
                      ">

                        <BookMarked className="h-5 w-5" />

                      </span>


                      <div>

                        <h3 className="
                          font-display
                          text-lg
                          font-bold
                          text-navy-900
                        ">

                          Publication Details

                        </h3>


                        <p className="
                          text-xs
                          text-slate-400
                        ">

                          Research information

                        </p>

                      </div>

                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="divide-y divide-slate-100">


                    {publication.authors && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <Users className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div>

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            Authors

                          </p>


                          <p className="
                            mt-1
                            text-sm
                            leading-relaxed
                            text-slate-700
                          ">

                            {publication.authors}

                          </p>

                        </div>

                      </div>

                    )}


                    {publication.journal && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <BookMarked className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div>

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            Journal

                          </p>


                          <p className="
                            mt-1
                            text-sm
                            leading-relaxed
                            text-slate-700
                          ">

                            {publication.journal}

                          </p>

                        </div>

                      </div>

                    )}


                    {publication.publication_date && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <Calendar className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div>

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            Publication Date

                          </p>


                          <p className="
                            mt-1
                            text-sm
                            text-slate-700
                          ">

                            {publication.publication_date}

                          </p>

                        </div>

                      </div>

                    )}


                    {publication.publication_year && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <Calendar className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div>

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            Publication Year

                          </p>


                          <p className="
                            mt-1
                            text-sm
                            text-slate-700
                          ">

                            {publication.publication_year}

                          </p>

                        </div>

                      </div>

                    )}


                    {publication.doi && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <Tag className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div className="min-w-0">

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            DOI

                          </p>


                          <p className="
                            mt-1
                            break-all
                            text-sm
                            leading-relaxed
                            text-slate-700
                          ">

                            {publication.doi}

                          </p>

                        </div>

                      </div>

                    )}


                    {publication.category && (

                      <div className="
                        flex
                        gap-3
                        px-6
                        py-5
                      ">

                        <Tag className="
                          mt-0.5
                          h-4
                          w-4
                          shrink-0
                          text-accent-500
                        " />

                        <div>

                          <p className="
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-slate-400
                          ">

                            Category

                          </p>


                          <span className="
                            mt-2
                            inline-flex
                            rounded-full
                            bg-accent-50
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-accent-700
                          ">

                            {publication.category}

                          </span>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </Reveal>


              {/* QUICK ACCESS */}

              {(publication.publication_url ||
                publication.publication_file) && (

                <Reveal delay={0.15}>

                  <div className="
                    rounded-3xl
                    border
                    border-accent-100
                    bg-accent-50/40
                    p-6
                  ">

                    <div className="flex gap-3">

                      <LinkIcon className="
                        h-5
                        w-5
                        shrink-0
                        text-accent-600
                      " />

                      <div>

                        <h4 className="
                          text-sm
                          font-bold
                          text-navy-900
                        ">

                          Research Access

                        </h4>


                        <p className="
                          mt-1
                          text-xs
                          leading-relaxed
                          text-slate-500
                        ">

                          Use the available links to access or download
                          this publication.

                        </p>

                      </div>

                    </div>

                  </div>

                </Reveal>

              )}

            </aside>

          </div>


          {/* =====================================================
              RELATED PUBLICATIONS
          ===================================================== */}

          {related.length > 0 && (

            <div className="mt-20 border-t border-slate-200 pt-16 sm:mt-24 sm:pt-20">


              <Reveal>

                <div className="
                  mb-10
                  flex
                  flex-col
                  justify-between
                  gap-4
                  sm:flex-row
                  sm:items-end
                ">

                  <div>

                    <span className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-accent-600
                    ">

                      Continue Exploring

                    </span>


                    <h2 className="
                      mt-3
                      font-display
                      text-3xl
                      font-extrabold
                      text-navy-900
                    ">

                      Related Publications

                    </h2>

                  </div>


                  <Link
                    to="/publications"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-accent-600
                      transition-colors
                      hover:text-accent-700
                    "
                  >

                    View All

                    <ArrowLeft className="
                      h-4
                      w-4
                      rotate-180
                    " />

                  </Link>

                </div>

              </Reveal>


              <div className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
              ">

                {related.map((pub, index) => (

                  <Reveal
                    key={pub.id}
                    delay={index * 0.08}
                  >

                    <Link
                      to={`/publications/${pub.id}`}
                      className="group block h-full"
                    >

                      <article className="
                        relative
                        flex
                        h-full
                        flex-col
                        rounded-3xl
                        border
                        border-slate-200/70
                        bg-white
                        p-6
                        shadow-soft
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-accent-200
                        hover:shadow-card
                      ">


                        <span className="
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
                          group-hover:scale-105
                        ">

                          <FileText className="h-5 w-5" />

                        </span>


                        <h3 className="
                          mt-5
                          font-display
                          text-base
                          font-bold
                          leading-snug
                          text-navy-900
                          transition-colors
                          group-hover:text-accent-600
                          line-clamp-3
                        ">

                          {pub.title}

                        </h3>


                        <div className="
                          mt-auto
                          flex
                          items-center
                          justify-between
                          border-t
                          border-slate-100
                          pt-4
                        ">

                          <span className="
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-slate-400
                          ">

                            <Calendar className="h-3.5 w-3.5" />

                            {pub.publication_year || 'Research'}

                          </span>


                          <span className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-semibold
                            text-accent-600
                          ">

                            Read

                            <ExternalLink className="
                              h-3.5
                              w-3.5
                            " />

                          </span>

                        </div>

                      </article>

                    </Link>

                  </Reveal>

                ))}

              </div>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}