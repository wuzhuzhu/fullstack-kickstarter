- echo "DATABASE_URL=$DATABASE_URL" >> .env
- echo "PRISMA_GENERATE_DATAPROXY=$PRISMA_GENERATE_DATAPROXY" >> .env
- echo "SHADOW_DATABASE_URL=$SHADOW_DATABASE_URL" >> .env
- echo "SMTP_FROM=$SMTP_FROM" >> .env
- echo "SMTP_PASSWORD=$SMTP_PASSWORD" >> .env
- echo "SMTP_USER=$SMTP_USER" >> .env
- echo "SMTP_PORT=$SMTP_PORT" >> .env
- echo "SMTP_HOST=$SMTP_HOST" >> .env
- echo "GITHUB_SECRET=$GITHUB_SECRET" >> .env
- echo "GITHUB_ID=$GITHUB_ID" >> .env
- echo "SECRET=$SECRET" >> .env





SECRET=BUNENGSHUODEMIMI

NEXTAUTH_URL='http://localhost:3000'
# GitHub oAuth
GITHUB_ID=276f503c0a89bb86b91b
GITHUB_SECRET=4a70282d233d526f707b283dcd35b851b0dd1f0e

# Email (magic link)
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_USER=aaron_ay
SMTP_PASSWORD=ruapnuncnrtnbijc
SMTP_FROM=aaron_ay@qq.com

# Database
MIGRATE_DATABASE_URL=postgres://postgres:Haohaoxuexi1@db.safsupctteciivtoavwm.supabase.co:5432/postgres
DATABASE_URL_POOLING_SUPABASE=postgres://postgres:Haohaoxuexi1@db.safsupctteciivtoavwm.supabase.co:6543/postgres
DATABASE_URL_PRISMA__SUPABASE_DATA_PROXY=prisma://aws-us-east-1.prisma-data.com/?api_key=9bWCVau3_UCvth6KcKPNqphGOgevRypdW4O0AAh23IUvaxep3ID4-0izqa1H0qQy
DATABASE_URL=prisma://aws-us-east-1.prisma-data.com/?api_key=aC3oc5UQBRhRDTBzSLbetpJhRmMenYaodYQoTQElmv-uqdhnIMaea5ATUovYI0vH
SHADOW_DATABASE_URL=postgres://postgres:Haohaoxuexi1@db.safsupctteciivtoavwm.supabase.co:5432/postgres_shadow

# OpenAI
OPENAI_API_KEY=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