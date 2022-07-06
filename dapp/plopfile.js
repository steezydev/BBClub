module.exports = function (plop) {
  plop.setGenerator('ct-hook', {
    description: 'Create a contract hook',
    prompts: [
      {
        type: 'input',
        name: 'method',
        message: 'What is the contract method?',
      },
      {
        type: 'list',
        name: 'type',
        choices: ['Read', 'Write'],
        message: 'Is that a read or write method?',
      },
      {
        when: function (response) {
          return response.type == 'Read';
        },
        type: 'confirm',
        name: 'isBigNumber',
        message: 'Is BigNumber?',
        default: true,
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.type == 'Read') {
        actions.push({
          type: 'add',
          path: 'src/hooks/use{{pascalCase method}}.tsx',
          templateFile: 'templates/ReadHook.tsx.hbs',
        });
      } else {
        actions.push({
          type: 'add',
          path: 'src/hooks/use{{pascalCase method}}.tsx',
          templateFile: 'templates/WriteHook.tsx.hbs',
        });
      }

      return actions;
    },
  });

  plop.setGenerator('contract', {
    description: 'Create a new contract instance',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the contract?',
      },
      {
        type: 'input',
        name: 'address',
        message: 'What is contract address?',
      },
      {
        type: 'confirm',
        name: 'createProvider',
        message: 'Should provider be created?',
        default: true,
      },
    ],
    actions: function (data) {
      var actions = [
        {
          type: 'append',
          path: 'contracts/abi/index.ts',
          templateFile: 'templates/indexAbi.ts.hbs',
        },
        {
          type: 'append',
          pattern: /(\/\/ ADDRESSES)/g,
          path: 'contracts/addresses.ts',
          templateFile: 'templates/address.ts.hbs',
        },
      ];

      if (data.createProvider) {
        actions.push({
          type: 'append',
          pattern: /(\/\/ ABI IMPORT)/g,
          path: 'src/lib/contractsProvider.ts',
          templateFile: 'templates/providerAbi.ts.hbs',
        });

        actions.push({
          type: 'append',
          pattern: /(\/\/ TYPECHAIN IMPORT)/g,
          path: 'src/lib/contractsProvider.ts',
          templateFile: 'templates/providerType.ts.hbs',
        });

        actions.push({
          type: 'append',
          path: 'src/lib/contractsProvider.ts',
          templateFile: 'templates/provider.ts.hbs',
        });
      }

      return actions;
    },
  });
};