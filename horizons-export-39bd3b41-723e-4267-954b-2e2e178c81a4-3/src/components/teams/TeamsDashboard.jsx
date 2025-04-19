
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const TeamsDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    checkTeamsConnection();
  }, []);

  const checkTeamsConnection = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('teams_accounts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setConnectedAccount(data);
    } catch (error) {
      console.error('Error checking Teams connection:', error);
    }
  };

  const handleTeamsConnect = () => {
    const clientId = "YOUR_MS_CLIENT_ID";
    const redirectUri = window.location.origin;
    const scope = "User.Read Chat.Read Team.ReadBasic.All";
    
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&response_mode=fragment`;
    
    window.location.href = authUrl;
  };

  useEffect(() => {
    const handleTeamsRedirect = async () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        
        if (accessToken) {
          try {
            setLoading(true);
            // Get user info from Microsoft Graph API
            const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const userData = await userResponse.json();

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
              .from('teams_accounts')
              .insert([
                {
                  user_id: user.id,
                  email: userData.userPrincipalName,
                  access_token: accessToken
                }
              ])
              .select();

            if (error) throw error;

            setConnectedAccount(data[0]);
            toast({
              title: "Success",
              description: "Microsoft Teams connected successfully!",
            });

            // Clear the URL hash
            window.location.hash = '';
          } catch (error) {
            console.error('Error connecting Teams:', error);
            toast({
              title: "Error",
              description: "Failed to connect Microsoft Teams",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }
      }
    };

    handleTeamsRedirect();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              Microsoft Teams Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Button disabled className="w-full bg-blue-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </Button>
            ) : connectedAccount ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{connectedAccount.email}</span>
                  </div>
                  <span className="text-sm text-green-500">Connected</span>
                </div>
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600"
                  onClick={async () => {
                    try {
                      const { error } = await supabase
                        .from('teams_accounts')
                        .delete()
                        .eq('id', connectedAccount.id);
                      
                      if (error) throw error;
                      
                      setConnectedAccount(null);
                      toast({
                        title: "Success",
                        description: "Teams account disconnected successfully",
                      });
                    } catch (error) {
                      console.error('Error disconnecting Teams:', error);
                      toast({
                        title: "Error",
                        description: "Failed to disconnect Teams account",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  Disconnect Teams
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleTeamsConnect}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Connect Microsoft Teams
              </Button>
            )}
          </CardContent>
        </Card>

        {!connectedAccount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Microsoft Teams Not Connected
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your Microsoft Teams account to view and manage your teams directly from here.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TeamsDashboard;
