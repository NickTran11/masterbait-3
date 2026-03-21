window.LEVEL2_EMAIL = {
  scenario: {
    codename: "ALEXISKA VANZ",
    title: "Egirl Gamer",
    description: "You are Alexiska Vanz, scrolling through social media at home watching posts, reels and messages online.",
    profile: [
      "Popular egirl gamer, influencer",
      "Active on social media",
      "Friendly and open to all DMs"
    ],
    habits: [
      "Explore new feeds and make new friends",
      "Always catch on trends, fear of missing out"
    ],
    context: "Inspect the feed, account details and direct messages. Decide the safest action without falling for the bait."
  },

  messages: [
    {
      id: "social-1",
      postAccountName: "thorus_canva.official",
      postCaption: "All my courses are 25% OFF this week 🔥 BUY NOW BEFORE SOLD OUT 🎯",
      bioPreview: "Investigate the creator page and their courses integrity",
      dmMessage: "Hey Sophie, you were selected for our private winner list. Tap this secret creator link before the reward expires.",
      dmLink: "creator-prize-access.com/claim",
      commentCount: "14k",
      inspector: {
        username: "Click the username of the reel creator to check their creator page",
        profileAge: "Check each reel comments",
        linkInBio: "Check the messages at bottom right"
      },

      correctAction: "report",
      partialAction: "verify",

      orderedHints: [
        "Interactive reel does really interact, don't fall for it!",
        "Only some reel comments are useful.",
        "Clickable or non-clickable? Watch out!",
        "Messages from Best Friend is a game changer!"
      ],

      verification: {
        prompt: "What is the safest way to verify a giveaway account before trusting it?",
        acceptedAnswers: [
          "verified account",
          "check verified account",
          "official profile",
          "official website",
          "check official website",
          "verify the official account"
        ],
        retryGuidance: [
          "Not quite. Do not trust the link in the post or DM. Think about how to verify the real account.",
          "Still not right. Look for an official verified profile or trusted official website.",
          "Use the real creator’s verified account or official website."
        ]
      },

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Nice catch.\nThat reel was bait.",
          lessons: [
            "Fake giveaways often use urgency, hype, and exclusivity.",
            "A suspicious bio link and DM link are major red flags.",
            "Safest move: report it and verify the creator from a real official source."
          ]
        },
        good: {
          title: "Good thinking!",
          bubble: "Better.\nYou slowed down.",
          lessons: [
            "Verifying a creator is much safer than tapping random links.",
            "Still, when content looks scammy, reporting it is the strongest move.",
            "Good instinct — but there is one safer action."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "Oops.\nThat social post was phishing.",
          lessons: [
            "Scammers use reels, DMs, and fake hype to create trust fast.",
            "Never trust a giveaway just because it looks popular.",
            "Check the official verified account, not the link they push."
          ]
        }
      }
    }
  ]
};
