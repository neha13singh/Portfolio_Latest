import Fuse from 'fuse.js';

class VectorStore {
    constructor() {
        this.fuse = null;
        this.profile = null;
    }

    /**
     * "Feeds" the database by chunking the portfolio data into searchable documents.
     * @param {Object} portfolioData 
     */
    feed(portfolioData) {
        this.profile = portfolioData.profile;

        const documents = [];

        // 1. Index Projects (Weighted High)
        portfolioData.projects.forEach(p => {
            documents.push({
                type: 'Project',
                content: p,
                keywords: `${p.name} ${p.description} ${p.tech.join(' ')} ${p.features.join(' ')}`
            });
        });

        // 2. Index Skills (Weighted Medium)
        Object.entries(portfolioData.skillCategories).forEach(([category, skills]) => {
            documents.push({
                type: 'Skills',
                content: { category, skills },
                keywords: `${category} ${skills.join(' ')}`
            });
        });

        // 3. Index Experience (Weighted High)
        portfolioData.experience.forEach(exp => {
            documents.push({
                type: 'Experience',
                content: exp,
                keywords: `${exp.role} ${exp.company} ${exp.description} ${exp.points.join(' ')}`
            });
        });

        // 4. Index Education (Weighted Low)
        portfolioData.education.forEach(edu => {
            documents.push({
                type: 'Education',
                content: edu,
                keywords: `${edu.degree} ${edu.school} ${edu.year}`
            });
        });

        // 5. Index Personal Details (New)
        if (portfolioData.profile.details) {
            documents.push({
                type: 'Personal',
                content: portfolioData.profile.details,
                keywords: `personal hobby strength weakness goal future dob age birthday interest badminton chess`
            });
        }

        // Configure Fuzzy Search
        const options = {
            includeScore: true,
            keys: ['keywords', 'type'],
            threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything
            distance: 100,
        };

        this.fuse = new Fuse(documents, options);
    }

    /**
     * Searches the "Vector DB" for relevant context.
     * @param {string} query 
     * @returns {Object} Context object
     */
    search(query) {
        if (!this.fuse) return { profile: this.profile };

        const results = this.fuse.search(query);

        // Take top 3 most relevant matches (Final balanced setting)
        const topMatches = results.slice(0, 3).map(r => r.item);

        return {
            profile: this.profile, // Always provide core profile
            relevant_data: topMatches.map(m => ({
                type: m.type,
                data: m.content
            }))
        };
    }
}

export const vectorStore = new VectorStore();
