import {
  ApolloError,
  ApolloQueryResult,
  OperationVariables,
  gql,
  useQuery,
} from "@apollo/client";
import { createContext, useContext, useState, ReactNode } from "react";

interface DataContextProps {
  userId: string;
  setUserId: (state: string) => void;
  data: any;
  loading: boolean;
  error: ApolloError | undefined;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  type ID = string;

  const GET_USER_WORKOUTS = gql`
    query UserWorkouts($userId: ID!) {
      userWorkouts(userId: $userId) {
        id
        name
        description
        calories
        userId
      }
    }
  `;

  const [userId, setUserId] = useState<ID>("");

  const { loading, error, data, refetch } = useQuery(GET_USER_WORKOUTS, {
    variables: { userId: userId },
  });

  const value: DataContextProps = {
    userId,
    setUserId,
    data,
    loading,
    error,
    refetch,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
