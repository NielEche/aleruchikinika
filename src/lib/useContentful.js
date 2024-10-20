import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

const useContentful = () => {
    const client = createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        host: "https://cdn.contentful.com"
    });

    const [records, setRecords] = useState([]);
    const [aboutRecord, setAboutRecord] = useState(null);
    const [projects, setProjects] = useState([]); // State for projects
    const [loading, setLoading] = useState(true);
    const [loadingAbout, setLoadingAbout] = useState(true);
    const [loadingProjects, setLoadingProjects] = useState(true); // Loading state for projects

    const getHomeContent = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'home',
                select: 'fields.title,fields.image',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                title: item.fields.title,
                image: item.fields.image?.fields.file.url,
            }));
            setRecords(sanitizedEntries);
        } catch (error) {
            console.error("Error Fetching Home Content:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAboutContent = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'about',
                select: 'fields.bio',
            });
            if (entries.items.length > 0) {
                setAboutRecord(entries.items[0].fields.bio);
            }
        } catch (error) {
            console.error("Error Fetching About Content:", error);
        } finally {
            setLoadingAbout(false);
        }
    };

    // New function to fetch project content
    const getProjects = async () => {
        try {
          const entries = await client.getEntries({
            content_type: 'projects',
            select: 'fields.title,fields.about,fields.cover,fields.images',
          });
          const sanitizedEntries = entries.items.map((item) => ({
            id: item.sys.id, // Ensure you have the project ID
            title: item.fields.title,
            about: item.fields.about, // This may be rich text, hence it will be rendered as such
            cover: item.fields.cover?.fields.file.url,
            images: item.fields.images?.map(image => image.fields.file.url) || [],
          }));
          setProjects(sanitizedEntries);
        } catch (error) {
          console.error("Error Fetching Projects:", error);
        } finally {
          setLoadingProjects(false);
        }
      };
      

    useEffect(() => {
        getHomeContent();
        getAboutContent();
        getProjects(); // Fetch Projects content
    }, []);

    return { records, loading, aboutRecord, loadingAbout, projects, loadingProjects };
};

export default useContentful;
