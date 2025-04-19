
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import EmailList from "./EmailList";

const EmailDashboard = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchConnectedAccounts();
  }, []);

  const fetchConnectedAccounts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('email_accounts')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setConnectedAccounts(data || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      toast({
        title: "Error",
        description: "Failed to load connected email accounts",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    const clientId = "YOUR_CLIENT_ID"; // You'll need to provide this
    const redirectUri = window.location.origin;
    const scope = "https://www.googleapis.com/auth/gmail.readonly";
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=consent`;
    
    // Open Google's OAuth consent screen
    window.location.href = authUrl;
  };

  useEffect(() => {
    // Handle the OAuth redirect
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        
        if (accessToken) {
          try {
            setLoading(true);
            // Get user info
            const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const userData = await userResponse.json();

            // Store in Supabase
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
              .from('email_accounts')
              .insert([
                {
                  user_id: user.id,
                  provider: 'Gmail',
                  email: userData.email,
                  access_token: accessToken,
                }
              ])
              .select();

            if (error) throw error;

            setConnectedAccounts([...connectedAccounts, data[0]]);
            
            toast({
              title: "Success",
              description: "Gmail account connected successfully!",
            });

            // Clear the URL hash
            window.location.hash = '';
          } catch (error) {
            console.error('Error handling OAuth redirect:', error);
            toast({
              title: "Error",
              description: "Failed to connect Gmail account",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }
      }
    };

    handleOAuthRedirect();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-500" />
              Gmail Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Button disabled className="w-full bg-blue-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </Button>
            ) : (
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Connect Gmail Account
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-500" />
              Outlook Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              disabled
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : connectedAccounts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Email Accounts Connected
          </h3>
          <p className="text-gray-600 mb-6">
            Connect your email accounts to view and manage your emails directly from here.
          </p>
        </motion.div>
      ) : (
        <EmailList accounts={connectedAccounts} emails={emails} />
      )}
    </div>
  );
};

export default EmailDashboard;
