import axios from 'axios';

export interface GoodReadsQuote {
  id: string;
  text: string;
  author: string;
  tags?: string[];
}

const GOODREADS_API = 'https://zenquotes.io/api';
const QUOTABLE_API = 'https://api.quotable.io';

export const QuoteAPIService = {
  // Zen Quotes API for random quotes
  async getRandomQuotes(count: number = 10): Promise<GoodReadsQuote[]> {
    try {
      const promises = Array(Math.min(count, 5))
        .fill(null)
        .map(() => axios.get(`${GOODREADS_API}/random`));

      const responses = await Promise.all(promises);
      return responses.map((res, index) => ({
        id: `zen_${index}_${Date.now()}`,
        text: res.data[0]?.q || '',
        author: res.data[0]?.a?.replace(/,\s*type.*$/, '') || 'Unknown',
        tags: [],
      }));
    } catch (error) {
      console.error('Error fetching random quotes:', error);
      return [];
    }
  },

  // Quotable API for searched quotes
  async searchQuotesByAuthor(author: string): Promise<GoodReadsQuote[]> {
    try {
      const response = await axios.get(`${QUOTABLE_API}/quotes`, {
        params: {
          author: author,
          limit: 20,
        },
      });

      return response.data.results?.map((quote: any, index: number) => ({
        id: `quotable_${index}_${Date.now()}`,
        text: quote.content,
        author: quote.author,
        tags: quote.tags || [],
      })) || [];
    } catch (error) {
      console.error('Error searching quotes by author:', error);
      return [];
    }
  },

  // Search quotes by keyword
  async searchQuotes(keyword: string): Promise<GoodReadsQuote[]> {
    try {
      const response = await axios.get(`${QUOTABLE_API}/quotes`, {
        params: {
          query: keyword,
          limit: 20,
        },
      });

      return response.data.results?.map((quote: any, index: number) => ({
        id: `quotable_${index}_${Date.now()}`,
        text: quote.content,
        author: quote.author,
        tags: quote.tags || [],
      })) || [];
    } catch (error) {
      console.error('Error searching quotes:', error);
      return [];
    }
  },

  // Get quotes by tag
  async getQuotesByTag(tag: string): Promise<GoodReadsQuote[]> {
    try {
      const response = await axios.get(`${QUOTABLE_API}/quotes`, {
        params: {
          tags: tag,
          limit: 20,
        },
      });

      return response.data.results?.map((quote: any, index: number) => ({
        id: `quotable_${index}_${Date.now()}`,
        text: quote.content,
        author: quote.author,
        tags: quote.tags || [],
      })) || [];
    } catch (error) {
      console.error('Error fetching quotes by tag:', error);
      return [];
    }
  },

  // Get author information from a simple REST endpoint
  async getAuthorInfo(author: string): Promise<string> {
    try {
      const response = await axios.get(`${QUOTABLE_API}/authors`, {
        params: {
          query: author,
        },
      });

      return response.data.results?.[0]?.bio || `${author} - Renowned author and thinker`;
    } catch (error) {
      return `${author} is a renowned author and thinker known for their insightful quotes.`;
    }
  },
};

export default QuoteAPIService;
