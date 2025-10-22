'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/CopyButton';
import { Shield, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface JWTHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

interface JWTPayload {
  sub?: string;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  nbf?: number;
  [key: string]: any;
}

interface JWTResult {
  header: JWTHeader | null;
  payload: JWTPayload | null;
  signature: string;
  isValid: boolean;
  error: string | null;
  isExpired: boolean;
  timeToExpiry: string | null;
}

export default function JWTDecoder() {
  const [jwtToken, setJwtToken] = useState('');
  const [result, setResult] = useState<JWTResult | null>(null);
  const [showSignature, setShowSignature] = useState(false);

  const decodeJWT = (token: string): JWTResult => {
    try {
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        return {
          header: null,
          payload: null,
          signature: '',
          isValid: false,
          error: 'Invalid JWT format. JWT should have 3 parts separated by dots.',
          isExpired: false,
          timeToExpiry: null
        };
      }

      const [headerPart, payloadPart, signaturePart] = parts;

      // Decode header
      const header = JSON.parse(atob(headerPart.replace(/-/g, '+').replace(/_/g, '/')));
      
      // Decode payload
      const payload = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')));

      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      const isExpired = payload.exp ? payload.exp < now : false;
      
      // Calculate time to expiry
      let timeToExpiry = null;
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000);
        const timeDiff = payload.exp - now;
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / 86400);
          const hours = Math.floor((timeDiff % 86400) / 3600);
          const minutes = Math.floor((timeDiff % 3600) / 60);
          
          if (days > 0) {
            timeToExpiry = `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            timeToExpiry = `${hours}h ${minutes}m`;
          } else {
            timeToExpiry = `${minutes}m`;
          }
        }
      }

      return {
        header,
        payload,
        signature: signaturePart,
        isValid: true,
        error: null,
        isExpired,
        timeToExpiry
      };
    } catch (error) {
      return {
        header: null,
        payload: null,
        signature: '',
        isValid: false,
        error: 'Failed to decode JWT. Please check if the token is valid.',
        isExpired: false,
        timeToExpiry: null
      };
    }
  };

  const handleDecode = () => {
    if (!jwtToken.trim()) {
      setResult(null);
      return;
    }
    
    const decoded = decodeJWT(jwtToken.trim());
    setResult(decoded);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const getStatusColor = () => {
    if (!result) return 'text-gray-500';
    if (!result.isValid) return 'text-red-500';
    if (result.isExpired) return 'text-orange-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (!result) return null;
    if (!result.isValid) return <AlertTriangle className="w-5 h-5" />;
    if (result.isExpired) return <AlertTriangle className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              JWT Decoder
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Decode and analyze JSON Web Tokens (JWT). View header, payload, and signature information safely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              JWT Token Input
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter JWT Token
                </label>
                <textarea
                  value={jwtToken}
                  onChange={(e) => setJwtToken(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <Button
                onClick={handleDecode}
                className="w-full"
                disabled={!jwtToken.trim()}
              >
                <Shield className="w-4 h-4 mr-2" />
                Decode JWT
              </Button>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2"><strong>Note:</strong> This tool only decodes JWT tokens. It doesn't verify signatures or make network requests.</p>
                <p>Your token is processed locally in your browser for maximum security.</p>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Decoded Information
              </h2>
              {result && result.isValid && (
                <CopyButton text={JSON.stringify({ header: result.header, payload: result.payload }, null, 2)} />
              )}
            </div>
            
            {result ? (
              <div className="space-y-4">
                {/* Status */}
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  !result.isValid ? 'bg-red-50 dark:bg-red-900/20' :
                  result.isExpired ? 'bg-orange-50 dark:bg-orange-900/20' :
                  'bg-green-50 dark:bg-green-900/20'
                }`}>
                  {getStatusIcon()}
                  <span className={`font-medium ${
                    !result.isValid ? 'text-red-700 dark:text-red-300' :
                    result.isExpired ? 'text-orange-700 dark:text-orange-300' :
                    'text-green-700 dark:text-green-300'
                  }`}>
                    {!result.isValid ? 'Invalid JWT' :
                     result.isExpired ? 'Token Expired' :
                     'Valid JWT'}
                  </span>
                </div>

                {result.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 text-sm">{result.error}</p>
                  </div>
                )}

                {result.isValid && (
                  <>
                    {/* Header */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Header</h3>
                      <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
                        {JSON.stringify(result.header, null, 2)}
                      </pre>
                    </div>

                    {/* Payload */}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Payload</h3>
                      <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
                        {JSON.stringify(result.payload, null, 2)}
                      </pre>
                    </div>

                    {/* Signature */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">Signature</h3>
                        <Button
                          onClick={() => setShowSignature(!showSignature)}
                          variant="outline"
                          size="sm"
                        >
                          {showSignature ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                          {showSignature ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono break-all">
                        {showSignature ? result.signature : '••••••••••••••••••••••••••••••••••••••••'}
                      </div>
                    </div>

                    {/* Token Info */}
                    {result.payload && (
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">Token Information</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg space-y-2 text-sm">
                          {result.payload.iss && (
                            <div><strong>Issuer:</strong> {result.payload.iss}</div>
                          )}
                          {result.payload.sub && (
                            <div><strong>Subject:</strong> {result.payload.sub}</div>
                          )}
                          {result.payload.aud && (
                            <div><strong>Audience:</strong> {result.payload.aud}</div>
                          )}
                          {result.payload.iat && (
                            <div><strong>Issued At:</strong> {formatTimestamp(result.payload.iat)}</div>
                          )}
                          {result.payload.exp && (
                            <div><strong>Expires At:</strong> {formatTimestamp(result.payload.exp)}</div>
                          )}
                          {result.payload.nbf && (
                            <div><strong>Not Before:</strong> {formatTimestamp(result.payload.nbf)}</div>
                          )}
                          {result.timeToExpiry && !result.isExpired && (
                            <div><strong>Time to Expiry:</strong> {result.timeToExpiry}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Enter a JWT token to decode it
              </div>
            )}
          </Card>
        </div>

        {/* Examples */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Example JWT Token
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm font-mono break-all text-gray-700 dark:text-gray-300">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This is a sample JWT token. Try pasting it above to see the decoded information.
            </div>
          </div>
        </Card>

        {/* Security Note */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security Information
          </h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <p>This tool processes JWT tokens locally in your browser. No data is sent to external servers.</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <p>Only the header and payload are decoded. The signature is not verified.</p>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <p>Never share sensitive JWT tokens with untrusted parties.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
