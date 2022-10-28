import { TestContext } from 'yup';
import { AnyObject } from 'yup/lib/types';

const testWord =
  (testType: 'default' | 'cql') => (word: string | undefined, context: TestContext<AnyObject>) => {
    const cqlEnable = context.parent.cqlEnable as boolean;
    const cqlSyntax = /^\s*$|[(["'`].*?[)\]"'`]|[|]/g;

    if (word) {
      const invalidSyntax =
        testType === 'cql'
          ? cqlEnable === true && !cqlSyntax.test(word)
          : cqlEnable === false && cqlSyntax.test(word);

      if (invalidSyntax) return false;
    }

    return true;
  };

export default testWord;
