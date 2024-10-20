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
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]); // State for clients
    const [loading, setLoading] = useState(true);
    const [loadingAbout, setLoadingAbout] = useState(true);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingClients, setLoadingClients] = useState(true); // Loading state for clients

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

    const getProjects = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'projects',
                select: 'fields.title,fields.about,fields.cover,fields.images',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                id: item.sys.id,
                title: item.fields.title,
                about: item.fields.about,
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

    // New function to fetch client content
    const getClients = async () => {
        try {
            const entries = await client.getEntries({
                content_type: 'clients',
                select: 'fields.name,fields.image',
            });
            const sanitizedEntries = entries.items.map((item) => ({
                name: item.fields.name,
                image: item.fields.image?.fields.file.url,
            }));
            setClients(sanitizedEntries);
        } catch (error) {
            console.error("Error Fetching Clients:", error);
        } finally {
            setLoadingClients(false);
        }
    };

    useEffect(() => {
        getHomeContent();
        getAboutContent();
        getProjects();
        getClients(); // Fetch Clients content
    }, []);

    return {
        records,
        loading,
        aboutRecord,
        loadingAbout,
        projects,
        loadingProjects,
        clients,
        loadingClients, // Return clients and loading state
    };
};

export default useContentful;
