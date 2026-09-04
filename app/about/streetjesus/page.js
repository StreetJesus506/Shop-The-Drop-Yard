import CartIcon from '@/components/CartIcon'

export const metadata = {
  title: 'Street Jesus Got Soul | DJ Bio & Booking',
  description: 'International DJ Street Jesus Got Soul — Salt Lake City Hip-Hop Pioneer. Available for bookings worldwide including concerts, weddings, festivals, corporate events and more.',
}

export default function StreetJesusBioPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d0d0d', color: '#e8e8e8' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <a href="/brands/streetjesus" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '12px', letterSpacing: '1px',
          border: '1px solid #e8e8e8',
          color: '#e8e8e8', padding: '8px 14px',
          textDecoration: 'none', textTransform: 'uppercase',
        }}>
          ← STREET JESUS GOT SOUL
        </a>
        <a href="/" style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: '14px', fontWeight: 700,
          color: '#ff5a1f', textDecoration: 'none',
          textTransform: 'uppercase',
        }}>
          THE DROP YARD
        </a>
        <CartIcon color="#e8e8e8" />
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Hero */}
        <h1 style={{
          fontFamily: 'Big Shoulders Stencil, sans-serif',
          fontSize: 'clamp(52px, 12vw, 110px)',
          fontWeight: 900, textTransform: 'uppercase',
          lineHeight: 0.85, marginBottom: '8px',
          color: '#f4f1ea',
        }}>
          STREET<br />JESUS<br />GOT SOUL
        </h1>

        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px', letterSpacing: '3px',
          color: '#6b6b63', marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          International DJ
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          <a
            href="https://www.instagram.com/streetjesusgotsoul"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', letterSpacing: '1px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#e8e8e8', padding: '8px 16px',
              textDecoration: 'none', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            IG @STREETJESUSGOTSOUL
          </a>
          <a
            href="https://www.mixcloud.com/jesus-de-la-calle/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', letterSpacing: '1px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#e8e8e8', padding: '8px 16px',
              textDecoration: 'none', textTransform: 'uppercase',
            }}
          >
            MIXCLOUD
          </a>
          <a
            href="mailto:streetjesusgotsoul@gmail.com"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', letterSpacing: '1px',
              border: '1px solid #ff5a1f',
              color: '#ff5a1f', padding: '8px 16px',
              textDecoration: 'none', textTransform: 'uppercase',
            }}
          >
            BOOK NOW
          </a>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Bio */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            ABOUT
          </h2>

              <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
  Music is in the blood. With a grandfather that played piano/organ, and a father that played drums, Street Jesus grew up around music.
</p>

<p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
  Before ever touching a record, friends introduced graffiti expos, Bboy battles, and Hip Hop events. A culture more than a style of music. Eventually taking up turntables and practicing scratching in the bedroom.
</p>

<p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
  What followed was 25 years of more practice. Bedroom turned into bars. Then to Bboy battles. Bars and battles gave way to festivals, tours, and stages across more than 15 countries. But the thread never changed — play the music that resonates. Let the music lead. The crowd will follow.
</p>

<p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
  Salt Lake City isn't necessarily known as a Hip Hop city, and while others came before, Street Jesus helped advance that. Not by fighting against what the city was, but by building what it could be — creating free community events, inheriting a record store turned cultural hub, providing spaces where Bboys could stand alongside painters and muralists as legitimate artists. Graffiti went from something the city frowned upon to something it celebrated. Hip Hop went from the margins to the main stage of the broader arts community.
</p>

<p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
  And he kept doing that year after year. Not because it made financial sense, because it was fun.
</p>


          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            Available for bookings in the US and abroad including concerts, 
            weddings, corporate events, trade shows, festivals, and private parties.
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            Creator and manager of several long-running Salt Lake City events including Vibras Del Lago 
            Cumbia Collective, Motown On Mondays, and various Hip Hop & Reggae nights across the city. 
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
              Former owner and operator of Uprok Hip Hop community center for 15 years. 
              Creating several graffiti, Bboy, music, and community service events throughout the city during that time.
              Also participating in several city sponsored events as an attraction through art, dance, & music. 
          </p>

          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '20px' }}>
            Contributor to the creation of Utah Urban Arts Festival, Urban Arts at the Utah Arts Festival, and Breakdance, 
            a Hip Hop based film festival satellite during Sundance Film Festival.
          </p>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Strengths */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            STRENGTHS
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['Music Selection', 'Crowd Control', 'Mixing', 'Range'].map(strength => (
              <span key={strength} style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px', letterSpacing: '1px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#e8e8e8', padding: '8px 16px',
                textTransform: 'uppercase',
              }}>
                {strength}
              </span>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Testimonials */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            TESTIMONIALS
          </h2>

          {[
            {
              quote: "He's the most well-traveled DJ from Utah.",
              author: "DJ Matty Mo",
            },
            {
              quote: "Street Jesus is a purist… very truthful and true school. He doesn't compromise his values musically, but he's got impeccable taste in many genres and a vast musical background. Sit back and listen, you might learn something.",
              author: "DJ Godina",
            },
            {
              quote: "He's a good dude, chill dude to hang with. I've known him for a long time. He's been holding it down for hip-hop in Salt Lake forever, man—like, official. He had the store (Uprok)… brought the shows out to Salt Lake and kept shit poppin' out here for a long time.",
              author: "Slaine (rapper/actor)",
            },
          ].map(({ quote, author }) => (
            <div key={author} style={{
              borderLeft: '2px solid #f4f1ea',
              paddingLeft: '20px',
              marginBottom: '28px',
            }}>
              <p style={{
                fontSize: '15px', lineHeight: 1.7,
                color: '#cfcac0', margin: '0 0 8px',
                fontStyle: 'italic',
              }}>
                "{quote}"
              </p>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '11px', color: '#6b6b63',
                margin: 0, letterSpacing: '1px',
              }}>
                — {author}
              </p>
            </div>
          ))}
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Credits */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            NOTABLE CREDITS
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '16px' }}>
            Opened, toured with, and/or served as backing DJ for:
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '16px' }}>
            De La Soul, The Pharcyde, Hieroglyphics, Edo G, Masta Ace, DJ Qbert, RJD2, 
            Thievery Corporation, R.A. the Rugged Man, Slaine, Sean Price, Bone Thugs, 
            Monophonics, Ziggy Marley, DJ Shortkut, Atmosphere, Aesop Rock, Blueprint, 
            TC Izlam, Murs, Novalima & many others.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#cfcac0' }}>
            Extensive festival experience including SXSW (USA), Comic Con (USA, Belgium), Bamboo Bass (Costa Rica), Mana Fest (Costa Rica),
            Get Freaky (USA), Meeting Of Styles (USA, Costa Rica), ADE (Netherlands), Audio Circus (USA), Sundance Film Festival (USA),
            Utah Arts Festival (USA), and others.
          </p>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Awards */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            AWARDS
          </h2>
          {[
            'Nominated Best DJ in Utah by Salt Lake City Weekly — 4 consecutive years (2012–2016)',
            'First Place — Utah Life Elevated DJ Battle (2010)',
          ].map(award => (
            <div key={award} style={{
              borderLeft: '2px solid #ff5a1f',
              paddingLeft: '20px',
              marginBottom: '16px',
            }}>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#cfcac0', margin: 0 }}>
                {award}
              </p>
            </div>
          ))}
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Featured Mix */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '24px', color: '#f4f1ea',
          }}>
            LISTEN
          </h2>
          <iframe
            width="100%"
            height="120"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fjesus-de-la-calle%2F1063-cumbia-mix-122918%2F"
            frameBorder="0"
            allow="autoplay"
            style={{ border: 'none' }}
          />
          <a
            href="https://www.mixcloud.com/jesus-de-la-calle/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginTop: '12px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px', color: '#6b6b63',
              textDecoration: 'none', letterSpacing: '1px',
            }}
          >
            MORE MIXES ON MIXCLOUD →
          </a>
        </section>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '48px' }} />

        {/* Booking */}
        <section>
          <h2 style={{
            fontFamily: 'Big Shoulders Stencil, sans-serif',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900, textTransform: 'uppercase',
            marginBottom: '16px', color: '#f4f1ea',
          }}>
            AVAILABLE FOR BOOKINGS
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#cfcac0', marginBottom: '24px' }}>
            Available worldwide for concerts, weddings, corporate events, trade shows, 
            festivals, and private parties. Reach out to discuss availability and rates.
          </p>
          <a
            href="mailto:streetjesusgotsoul@gmail.com"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: '#ff5a1f',
              color: '#1c1b19',
              textDecoration: 'none',
              fontFamily: 'Big Shoulders Stencil, sans-serif',
              fontSize: '16px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '1px',
            }}
          >
            GET IN TOUCH →
          </a>
        </section>

      </div>
    </main>
  )
}
