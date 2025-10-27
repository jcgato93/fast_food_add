import { CreateUserPrams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  ID,
  Query,
  TablesDB,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.jc.fastfood",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "68fec833001ed49afb41",
  userCollectionId: "user",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const tablesDb = new TablesDB(client);
const avatars = new Avatars(client);

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserPrams) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await tablesDb.createRow({
      databaseId: appwriteConfig.databaseId!,
      tableId: appwriteConfig.userCollectionId!,
      rowId: ID.unique(),
      data: {
        name,
        email,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    return await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("Usuario no autenticado");

    const currentUser = await tablesDb.listRows({
      databaseId: appwriteConfig.databaseId!,
      tableId: appwriteConfig.userCollectionId!,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser) throw Error("Usuario no encontrado");

    return currentUser.rows[0];
  } catch (error) {
    throw new Error(error as string);
  }
};
