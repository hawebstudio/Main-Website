import type { LocationCandidate, LocationTier } from '../types'

/**
 * Full candidate research pool for Phase 2, covering every city named in
 * the brief across all 10 target states. This is a DATA-ONLY structure —
 * none of these slugs are routable. Only the five Tier 1 Delhi/NCR cities
 * additionally exist in `publishedLocations` (data/published.ts) and are
 * therefore live pages. Everything else stays research/roadmap data until
 * there's a concrete reason (real client work, real local evidence) to
 * promote it — see LOCATION_KEYWORD_RESEARCH.md (Phase 1) and
 * LOCATION_SEO_MASTER_PLAN.md (Phase 2).
 */

interface CityInput {
  city: string
  tier: LocationTier
  /** Short, specific characterization used to build an honest one-line reason. */
  note: string
}

interface StateBlock {
  state: string
  stateSlug: string
  cities: CityInput[]
}

function slugifyCity(city: string): string {
  return city
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const TIER_REASON: Record<LocationTier, (note: string) => string> = {
  1: (note) => `Published launch market — ${note}, strong near-term commercial relevance.`,
  2: (note) =>
    `Strategic — ${note}. Real commercial potential, but needs more locally-specific evidence (client work, case studies) before an indexed page is justified.`,
  3: (note) =>
    `Supporting only — ${note}. Represented through the relevant state/region conversation for now rather than a dedicated page.`,
  4: (note) =>
    `Not currently targeted — ${note}. No concrete, verifiable local relationship or differentiated content angle exists yet, so a dedicated page would be a doorway page.`,
}

const STATE_BLOCKS: StateBlock[] = [
  {
    state: 'Delhi',
    stateSlug: 'delhi',
    cities: [
      { city: 'Delhi', tier: 1, note: 'the founder\'s home base and India\'s largest single market for digital services' },
      {
        city: 'New Delhi',
        tier: 4,
        note: 'New Delhi (NDMC area) is part of the same NCT of Delhi metro already served by the Delhi page — a separate page would duplicate it',
      },
    ],
  },
  {
    state: 'Uttar Pradesh',
    stateSlug: 'uttar-pradesh',
    cities: [
      { city: 'Noida', tier: 1, note: 'dense IT/startup corridor directly adjoining Delhi' },
      { city: 'Greater Noida', tier: 2, note: 'fast-growing IT/education corridor adjoining Noida' },
      { city: 'Ghaziabad', tier: 1, note: 'large NCR commercial and residential hub' },
      { city: 'Lucknow', tier: 2, note: 'Uttar Pradesh\'s state capital and largest administrative/commercial center' },
      { city: 'Kanpur', tier: 2, note: 'a major industrial and manufacturing city' },
      { city: 'Agra', tier: 3, note: 'a tourism-led economy with a smaller B2B software-buying base' },
      { city: 'Varanasi', tier: 3, note: 'a tourism/religious economy with a growing local business digitization need' },
      { city: 'Prayagraj', tier: 3, note: 'an administrative and education-led city' },
      { city: 'Meerut', tier: 3, note: 'an NCR-adjacent manufacturing and trading hub' },
      { city: 'Bareilly', tier: 4, note: 'a regional trading town without a distinct content angle yet' },
      { city: 'Gorakhpur', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Mathura', tier: 4, note: 'a religious-tourism town with limited B2B web demand' },
      { city: 'Moradabad', tier: 4, note: 'an export/manufacturing town without a distinct content angle yet' },
      { city: 'Aligarh', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Saharanpur', tier: 4, note: 'a regional town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Uttarakhand',
    stateSlug: 'uttarakhand',
    cities: [
      { city: 'Dehradun', tier: 2, note: 'Uttarakhand\'s state capital and main commercial hub' },
      { city: 'Haridwar', tier: 3, note: 'a religious-tourism city with a growing industrial belt' },
      { city: 'Haldwani', tier: 3, note: 'a regional commercial hub for the Kumaon region' },
      { city: 'Roorkee', tier: 3, note: 'home to a strong technical/engineering ecosystem' },
      { city: 'Rudrapur', tier: 4, note: 'an industrial town without a distinct content angle yet' },
      { city: 'Kashipur', tier: 4, note: 'an industrial town without a distinct content angle yet' },
      { city: 'Rishikesh', tier: 4, note: 'a tourism-led town with limited B2B web demand' },
      { city: 'Nainital', tier: 4, note: 'a tourism-led town with limited B2B web demand' },
      { city: 'Mussoorie', tier: 4, note: 'a tourism-led town with limited B2B web demand' },
      { city: 'Ramnagar', tier: 4, note: 'a small tourism-adjacent town without a distinct content angle yet' },
      { city: 'Almora', tier: 4, note: 'a small hill town without a distinct content angle yet' },
      { city: 'Pithoragarh', tier: 4, note: 'a small hill town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Haryana',
    stateSlug: 'haryana',
    cities: [
      { city: 'Gurugram', tier: 1, note: 'India\'s largest corporate/startup hub after Bengaluru' },
      { city: 'Faridabad', tier: 1, note: 'a large NCR industrial and commercial city' },
      { city: 'Panipat', tier: 3, note: 'a major textile/industrial hub' },
      { city: 'Ambala', tier: 3, note: 'a regional trading and cantonment city' },
      { city: 'Hisar', tier: 3, note: 'a regional commercial hub for western Haryana' },
      { city: 'Karnal', tier: 3, note: 'a regional agri-business and trading hub' },
      { city: 'Sonipat', tier: 4, note: 'an NCR-adjacent town already largely served by the Delhi/NCR pages' },
      { city: 'Rohtak', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Panchkula', tier: 4, note: 'a Chandigarh tri-city town without a distinct content angle yet' },
      { city: 'Yamunanagar', tier: 4, note: 'an industrial town without a distinct content angle yet' },
      { city: 'Bhiwani', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Kurukshetra', tier: 4, note: 'a heritage/education town with limited B2B web demand' },
    ],
  },
  {
    state: 'Punjab',
    stateSlug: 'punjab',
    cities: [
      { city: 'Ludhiana', tier: 2, note: 'Punjab\'s largest industrial and manufacturing city' },
      { city: 'Amritsar', tier: 2, note: 'a major commercial and tourism hub' },
      { city: 'Jalandhar', tier: 3, note: 'a sports-goods and light-industry manufacturing hub' },
      { city: 'Patiala', tier: 3, note: 'a regional administrative and education hub' },
      { city: 'Bathinda', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Mohali', tier: 3, note: 'part of the Chandigarh tri-city IT corridor' },
      { city: 'Pathankot', tier: 4, note: 'a border-region town without a distinct content angle yet' },
      { city: 'Hoshiarpur', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Moga', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Batala', tier: 4, note: 'a small industrial town without a distinct content angle yet' },
      { city: 'Khanna', tier: 4, note: 'a small trading town without a distinct content angle yet' },
      { city: 'Kapurthala', tier: 4, note: 'a small town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Himachal Pradesh',
    stateSlug: 'himachal-pradesh',
    cities: [
      { city: 'Shimla', tier: 2, note: 'Himachal Pradesh\'s state capital and main administrative/commercial hub' },
      { city: 'Dharamshala', tier: 3, note: 'a growing tourism and remote-work/startup-interest town' },
      { city: 'Solan', tier: 3, note: 'part of the Baddi-Solan industrial belt' },
      { city: 'Baddi', tier: 3, note: 'Himachal\'s largest pharma/manufacturing industrial hub' },
      { city: 'Mandi', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Kullu', tier: 4, note: 'a tourism-led town with limited B2B web demand' },
      { city: 'Manali', tier: 4, note: 'a tourism-led town with limited B2B web demand' },
      { city: 'Una', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Hamirpur', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Bilaspur', tier: 4, note: 'a small Himachal town without a distinct content angle yet (not to be confused with Bilaspur, Chhattisgarh)' },
      { city: 'Chamba', tier: 4, note: 'a small hill town without a distinct content angle yet' },
      { city: 'Nahan', tier: 4, note: 'a small town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    cities: [
      { city: 'Jaipur', tier: 2, note: 'Rajasthan\'s state capital and largest commercial hub' },
      { city: 'Jodhpur', tier: 2, note: 'a major commercial and tourism/handicrafts export hub' },
      { city: 'Udaipur', tier: 3, note: 'a tourism/hospitality-led economy' },
      { city: 'Kota', tier: 3, note: 'a nationally significant education hub' },
      { city: 'Ajmer', tier: 3, note: 'a regional administrative and pilgrimage-tourism hub' },
      { city: 'Bikaner', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Alwar', tier: 4, note: 'an NCR-adjacent industrial town without a distinct content angle yet' },
      { city: 'Bharatpur', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Sikar', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Sri Ganganagar', tier: 4, note: 'a regional agri-trading town without a distinct content angle yet' },
      { city: 'Bhilwara', tier: 4, note: 'a textile manufacturing town without a distinct content angle yet' },
      { city: 'Pali', tier: 4, note: 'a textile/trading town without a distinct content angle yet' },
      { city: 'Tonk', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Beawar', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Kishangarh', tier: 4, note: 'a marble-trading town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Jammu and Kashmir',
    stateSlug: 'jammu-and-kashmir',
    cities: [
      { city: 'Jammu', tier: 2, note: 'the winter capital and main commercial hub of J&K' },
      { city: 'Srinagar', tier: 2, note: 'the summer capital and largest commercial hub of the Kashmir valley' },
      { city: 'Anantnag', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Baramulla', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Kathua', tier: 4, note: 'a border-region town without a distinct content angle yet' },
      { city: 'Udhampur', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Samba', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Pulwama', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Kupwara', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Rajouri', tier: 4, note: 'a small town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Madhya Pradesh',
    stateSlug: 'madhya-pradesh',
    cities: [
      { city: 'Indore', tier: 2, note: 'Madhya Pradesh\'s largest commercial city and a recognized startup hub' },
      { city: 'Bhopal', tier: 2, note: 'Madhya Pradesh\'s state capital and administrative hub' },
      { city: 'Gwalior', tier: 3, note: 'a regional commercial and education hub' },
      { city: 'Jabalpur', tier: 3, note: 'a regional commercial and administrative hub' },
      { city: 'Ujjain', tier: 4, note: 'a religious-tourism town with limited B2B web demand' },
      { city: 'Sagar', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Rewa', tier: 4, note: 'a regional town without a distinct content angle yet' },
      { city: 'Satna', tier: 4, note: 'a cement-belt industrial town without a distinct content angle yet' },
      { city: 'Ratlam', tier: 4, note: 'a regional trading town without a distinct content angle yet' },
      { city: 'Dewas', tier: 4, note: 'an industrial town without a distinct content angle yet' },
      { city: 'Khandwa', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Burhanpur', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Vidisha', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Chhindwara', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Morena', tier: 4, note: 'a small town without a distinct content angle yet' },
    ],
  },
  {
    state: 'Chhattisgarh',
    stateSlug: 'chhattisgarh',
    cities: [
      { city: 'Raipur', tier: 2, note: 'Chhattisgarh\'s state capital and main commercial hub' },
      { city: 'Bhilai', tier: 3, note: 'a major steel/industrial city' },
      { city: 'Durg', tier: 4, note: 'a Bhilai-adjacent town without a distinct content angle yet' },
      { city: 'Bilaspur', tier: 4, note: 'a regional Chhattisgarh town without a distinct content angle yet (not to be confused with Bilaspur, Himachal Pradesh)' },
      { city: 'Korba', tier: 4, note: 'an energy/industrial town without a distinct content angle yet' },
      { city: 'Raigarh', tier: 4, note: 'an industrial town without a distinct content angle yet' },
      { city: 'Jagdalpur', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Rajnandgaon', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Ambikapur', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Dhamtari', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Mahasamund', tier: 4, note: 'a small town without a distinct content angle yet' },
      { city: 'Bemetara', tier: 4, note: 'a small town without a distinct content angle yet' },
    ],
  },
]

function buildCandidates(): LocationCandidate[] {
  const seenSlugs = new Map<string, number>()

  return STATE_BLOCKS.flatMap((block) =>
    block.cities.map(({ city, tier, note }) => {
      let slug = slugifyCity(city)
      // Disambiguate real-world duplicate city names across states (e.g. Bilaspur in HP and Chhattisgarh).
      if (seenSlugs.has(slug)) {
        const stateSuffix = block.stateSlug
          .split('-')
          .map((part) => part[0])
          .join('')
        slug = `${slug}-${stateSuffix}`
      }
      seenSlugs.set(slug, (seenSlugs.get(slug) ?? 0) + 1)

      return {
        city,
        state: block.state,
        stateSlug: block.stateSlug,
        slug,
        tier,
        reason: TIER_REASON[tier](note),
      } satisfies LocationCandidate
    }),
  )
}

export const locationCandidates: LocationCandidate[] = buildCandidates()

export function getCandidatesByState(stateSlug: string): LocationCandidate[] {
  return locationCandidates.filter((candidate) => candidate.stateSlug === stateSlug)
}

export function getCandidatesByTier(tier: LocationCandidate['tier']): LocationCandidate[] {
  return locationCandidates.filter((candidate) => candidate.tier === tier)
}
