export default function About() {
  return (
    <main className="mx-auto max-w-[640px] px-7 pt-18 pb-20 max-[640px]:px-5 max-[640px]:pt-12 max-[640px]:pb-14">
      <section className="mb-14">
        <p
          className="m-0 mb-4 italic text-[color:var(--muted)]"
          style={{
            fontVariant: "small-caps",
            letterSpacing: "0.14em",
            fontSize: "var(--size-utility)",
          }}
        >
          about
        </p>
        <h1
          className="m-0 mb-4 text-wrap-balance"
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 5.5vw, var(--size-hero))",
            letterSpacing: "-0.015em",
            lineHeight: 1.05,
          }}
        >
          Who I am, and how a typical day looks
        </h1>
      </section>

      <article className="prose">
        <p>
          I&rsquo;m an applied mathematician working in two areas: finance and
          healthcare. Most of my time nowadays is spent on research. My typical
          day is really just an example — most days are different.
        </p>
        <p>
          I&rsquo;m an early bird, waking up at 6am. This time in the morning
          is my time — when everything else is quiet (not very true these days
          as my young son is also an early bird). I do some reading, or go in
          front of my PC and do some development, work on a research paper, or
          read up on something I want to learn more about. These few hours in
          the morning are very critical for me — they give me a good start
          into the rest of the day, or even the week.
        </p>

        <h2>Finance (algorithmic trading)</h2>
        <p>
          Working in automated high-frequency market making, you are at the
          interface of computer science, AI/ML, mathematics, and economics. As
          it is quite difficult to work on all the aspects of market making,
          our work is highly collaborative between a small team of quant
          traders (myself) and quant developers (again myself) — and also
          talking to economists and strategists to have an idea of the
          economic events and announcements.
        </p>
        <p>
          The concept of automated HF market making is quite simple: you have
          a set of trading strategies that involve placing a limit order to
          sell (or offer), or a buy limit order (or bid), in order to earn the
          bid-ask spread. By doing so, we provide liquidity to incoming market
          orders. I love this job. Providing liquidity to the market is an
          incredibly important contribution one can make to society — just
          imagine that with your debit card you can travel anywhere in the
          world and take cash out in the local currency, or you can buy
          whatever on Amazon. This is only possible thanks to our work and
          that of others in other banks.
        </p>
        <p>
          Some typical work I do: backtesting a new strategy; analysing our
          live trading strategies both live and in the past few days; trying
          to understand what went well and what didn&rsquo;t. I might discover
          that we missed some good trades due to a delay — here we talk about
          milliseconds or less — and it is one of my favourite moments to
          discover the problem and find the solution. Being able to predict
          the fluctuation of the next price movement (next could be one
          millisecond or a few seconds) is very crucial, and we spend a good
          amount of time to build a model that can predict the direction of
          the market in real time. It is not easy: we are talking about a
          massive amount of data, and you need to make all computations as
          quick as possible.
        </p>
        <p>
          I love this job — as opposed to a lot of data-science or AI/ML jobs,
          you cannot bullshit with fancy models and presentations. Your model,
          or any improvement you claim to do a fantastic job on, can be
          assessed in real practice. But having said that, one always needs
          cutting-edge knowledge in computer science and applied mathematics
          (including AI, ML, statistics, and the rest).
        </p>

        <h2>Digital healthcare (remote patient monitoring)</h2>
        <p>
          Working at the interface of AI/ML and healthcare, most of my work is
          collaborative — with other AI/ML engineers or with researchers from
          a clinical background. I have many interdisciplinary collaborations
          with clinicians, software developers, and AI researchers on
          healthcare topics.
        </p>
        <p>
          At 9am I have my first standup meeting. Today I&rsquo;m meeting with
          our bigger team on the all-in-one cardiovascular project, where we
          design an automated platform to track digital biomarkers from users
          and try to give feedback on their risk of any cardiovascular event.
          This is a close collaboration between AI researchers and clinicians,
          which I truly enjoy — this interdisciplinary approach is so much
          more than the sum of its parts.
        </p>
        <p>
          Then at 10am I have a meeting with a research centre (academic) to
          discuss our collaboration on the data-collection platform and our AI
          models. Apart from loving to do research myself, I also take
          satisfaction from facilitating research and bringing the right
          people together, who then go off and do great things. It lasts
          until noon.
        </p>
        <p>
          After lunch I try to focus and do some development. I mostly spend
          this time improving the prediction of our cardiovascular risk
          model. I have a large obsession with improving our models to the
          maximum possible. Usually, one early-morning idea would take several
          days of implementing and testing.
        </p>

        <h2>Why this site exists</h2>
        <ol>
          <li>
            Practice my writing skills — in general I think more than I do,
            and I write much less about what I do.
          </li>
          <li>
            Gather all my notes and projects in one place, so I can share
            them with friends. Even for myself, being able to have access to
            my notes from anywhere is great.
          </li>
          <li>
            Share my professional experience with a larger group of people.
          </li>
        </ol>

        <h2>Background, for the CV-curious</h2>
        <p>
          École Polytechnique in Paris (Diplôme d&rsquo;Ingénieur 2000–03,
          followed by an MSc in Mathematical Finance and the DEA
          Probabilités et Applications, 2003–04). Before that, a BSc in
          Electrical Engineering at Sharif University in Tehran (1996–2000)
          with a minor in mathematics. In 1994 I picked up a gold medal at
          the Iranian Mathematical Olympiad — top ten nationally that year.
        </p>
      </article>
    </main>
  );
}
