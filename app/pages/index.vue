<script lang="ts" setup>
const features = [
  {
    icon: 'tabler:book',
    title: 'Sacred Stories',
    description:
      'Discover the ancient wisdom and legends passed down through generations of the Osage people.',
  },
  {
    icon: 'tabler:users',
    title: 'Community',
    description:
      'Connect with fellow members and share your experiences and knowledge.',
  },
  {
    icon: 'tabler:map',
    title: 'Journey Tracker',
    description:
      'Track your spiritual journey and progress through the branches of knowledge.',
  },
];
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>

      <div class="container hero-content">
        <h1 class="hero-title">
          Discover the Wisdom of
          <span class="gradient-text">the Osage</span>
        </h1>

        <p class="hero-description">
          Journey through the sacred stories and teachings of the Osage people.
          Connect with ancient wisdom and build your understanding of our rich
          heritage.
        </p>

        <div class="hero-actions">
          <NuxtLink to="/signin" class="btn btn-primary btn-lg">
            <Icon name="tabler:arrow-right" />
            Start Your Journey
          </NuxtLink>
          <button class="btn btn-secondary btn-lg">
            <Icon name="tabler:book" />
            Explore Stories
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="features-grid">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="feature-card card"
          >
            <div class="feature-icon">
              <Icon :name="feature.icon" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story">
      <div class="container">
        <div class="story-card card">
          <div class="story-header">
            <div class="story-icon">
              <Icon name="tabler:bow" />
            </div>
            <h2 class="story-title">Story of the Arrow</h2>
          </div>

          <div class="story-content">
            <p>
              Many years ago, even before we named ourselves Osage and spread
              across this land, there was a boy of one tribe and his name was
              Wisaokw (we-soak-wa). He was named for the tree under which he was
              born. The strong and resistant yellow wood used for bows and
              tools.
            </p>

            <p>
              Wisaokw wished to be a warrior like the young men of his band, but
              no one would consider him so even as he showed a steadfast heart
              and willingness to learn and grow.
            </p>

            <p class="story-quote">
              "Little Wisaokw, he is too young to join the hunt," they would
              say. "Too slow to run with the Bobcat clan. Not clever enough to
              hunt with the Wolf clan. Such a young one is not strong enough to
              join the Bear clan."
            </p>

            <p>
              No matter how hard Wisaokw worked, all ways were barred to him.
              But the Aged Chieftain of the tribe saw him differently than the
              rest. "The spirit of this young one burns brighter than the
              largest fire. Wisaokw has served his brethren well for one of his
              age. The time will come when the tribe will need only that which
              he can give."
            </p>

            <p>
              One evening early in the Spring, on an occasion much like this one
              of ours, a party of warriors was canoeing back to their village
              after a hunt. On this night, the fog rolled thick across the
              river. The fog was so heavy, the river path back to their village
              was hidden from view. They feared the strong current in the main
              river path would quickly sweep them far away from their village,
              and they knew another nearby fork in the river path led to a
              dangerous and roaring waterfall. The warriors could not find their
              direction and did not know the safe path to take so they were
              trapped. They were frightened and did not know what to do.
            </p>

            <p>
              Wisaokw had been practicing his hunting skills in the hills above
              the river and had seen the danger to the canoes. He wrapped an
              arrow in a skin, set it aflame, and shot it into the sky toward
              the safe river path. The warriors in the canoe saw the flaming
              arrow through the fog and followed it toward the safe river path
              back to the village. The warriors went to the Chieftain saying,
              "We were trapped on the river and the Great Spirit of the Heavens
              sent an Arrow of Light through the sky to guide us." The Chieftain
              smiled and said, "The sign which led you to safety came not from
              the heavens but from one who you thought was too young to do
              anything worthwhile." He brought Wisaokw forward to the surprise
              of the warriors.
            </p>

            <p class="story-quote">
              "Wisaokw has proved himself worthy to wear the name of warrior. He
              took personal responsibility and aided his brothers in their time
              of greatest need. Hereafter, all young members of our tribe shall
              become warriors only after meeting the challenges of the Arrow of
              Light. Let them each be filled with the spirit of Wisaokw and
              follow his example of unselfish service to our brethren."
            </p>

            <p>Thus it was made so and carried through to the present day.</p>

            <p>
              We call ourselves Osage, from the people who passed many
              generations through this land. And we are named for Wisaokw, the
              Lenni Lenape word for the Osage Orange tree, The Strong Yellow
              Wood Used for Bows and Tools. Like little Wisaokw, we may grow
              strong and wise, and our potential is mighty.
            </p>

            <p class="story-closing">
              This is where our name, <strong>Branches of Osage</strong>,
              <em>Kikhwi Tuhon Wisaokw</em> comes from.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container cta-content">
        <h2 class="cta-title">Ready to Begin?</h2>
        <p class="cta-description">
          Join our community and start exploring the branches of Osage
          knowledge.
        </p>
        <NuxtLink to="/signin" class="btn btn-primary btn-lg">
          Get Started
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  width: 100%;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  top: -10%;
  right: -10%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(
    135deg,
    var(--brand-secondary),
    var(--brand-accent)
  );
  bottom: -10%;
  left: -5%;
  animation-delay: -10s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-15px, 15px) scale(0.9);
  }
  75% {
    transform: translate(15px, 10px) scale(1.05);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.0625rem;
}

/* Features Section */
.features {
  padding: var(--spacing-2xl) 0;
  background: var(--bg-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.feature-card {
  text-align: center;
  cursor: default;
}

.feature-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  border-radius: var(--radius-lg);
  color: white;
  font-size: 1.75rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Story Section */
.story {
  padding: var(--spacing-2xl) 0;
  background: var(--bg-primary);
}

.story-card {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-2xl);
}

.story-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.story-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
  border-radius: var(--radius-xl);
  color: white;
  font-size: 2rem;
}

.story-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.story-content {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.story-content p {
  margin-bottom: var(--spacing-lg);
}

.story-content p:last-child {
  margin-bottom: 0;
}

.story-quote {
  font-style: italic;
  padding-left: var(--spacing-xl);
  border-left: 3px solid var(--brand-primary);
  color: var(--text-secondary);
  margin: var(--spacing-xl) 0;
}

.story-closing {
  font-size: 1.125rem;
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin-top: var(--spacing-2xl);
}

.story-closing strong {
  color: var(--brand-primary);
  font-weight: 700;
}

.story-closing em {
  color: var(--text-secondary);
}

/* CTA Section */
.cta {
  padding: var(--spacing-2xl) 0;
}

.cta-content {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-elevated);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.cta-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .hero {
    min-height: calc(100vh - 64px);
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
